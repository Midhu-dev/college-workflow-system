const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const router = express.Router();

// =====================================================
// IMAGE UPLOAD CONFIGURATION
// =====================================================

const uploadDirectory = path.join(__dirname, "../uploads");

// Create uploads folder automatically if it doesn't exist.
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

// Configure where and how uploaded images are stored.
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);
  },

  filename: (req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();

    const uniqueFilename =
      `event-${Date.now()}-${Math.round(Math.random() * 1e9)}` +
      extension;

    callback(null, uniqueFilename);
  },
});

// Accept image files only.
const fileFilter = (req, file, callback) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new Error("Only JPG, PNG, WEBP, and GIF images are allowed.")
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB
    files: 1,
  },
});

// =====================================================
// TEACHER: CREATE EVENT
// POST /api/events
// =====================================================

router.post(
  "/",
  authenticateToken,
  (req, res, next) => {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can create events",
      });
    }

    next();
  },
  upload.single("poster"),
  async (req, res) => {
    let uploadedFilePath = null;

    try {
      if (req.file) {
        uploadedFilePath = req.file.path;
      }

      // Multer parses multipart/form-data into req.body.
      if (!req.body) {
        if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
          fs.unlinkSync(uploadedFilePath);
        }

        return res.status(400).json({
          message: "Event form data is missing",
        });
      }

      const {
        title,
        description,
        eventDate,
        eventTime,
        location,
      } = req.body;

      if (!title || !title.trim() || !eventDate) {
        if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
          fs.unlinkSync(uploadedFilePath);
        }

        return res.status(400).json({
          message: "Title and event date are required",
        });
      }

      // Save a relative URL in the database.
      const posterUrl = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const [result] = await db.query(
        `INSERT INTO events
        (
          title,
          description,
          event_date,
          event_time,
          location,
          poster_url,
          created_by
        )
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          title.trim(),
          description?.trim() || null,
          eventDate,
          eventTime || null,
          location?.trim() || null,
          posterUrl,
          req.user.id,
        ]
      );

      return res.status(201).json({
        message: "Event created successfully",

        event: {
          id: result.insertId,
          title: title.trim(),
          description: description?.trim() || null,
          event_date: eventDate,
          event_time: eventTime || null,
          location: location?.trim() || null,
          poster_url: posterUrl,
        },
      });
    } catch (error) {
      console.error("Event creation error:", error);

      // Remove uploaded image if event creation fails.
      if (uploadedFilePath && fs.existsSync(uploadedFilePath)) {
        try {
          fs.unlinkSync(uploadedFilePath);
        } catch (cleanupError) {
          console.error("Uploaded image cleanup error:", cleanupError);
        }
      }

      return res.status(500).json({
        message: "Failed to create event",
      });
    }
  }
);

// =====================================================
// STUDENTS + TEACHERS: VIEW ALL EVENTS
// GET /api/events
// =====================================================

router.get("/", authenticateToken, async (req, res) => {
  try {
    const [events] = await db.query(
      `SELECT
        e.id,
        e.title,
        e.description,
        e.event_date,
        e.event_time,
        e.location,
        e.poster_url,
        e.created_at,
        u.name AS created_by_name
      FROM events e
      JOIN users u ON e.created_by = u.id
      ORDER BY e.event_date ASC, e.event_time ASC`
    );

    return res.json({
      events,
    });
  } catch (error) {
    console.error("Fetch events error:", error);

    return res.status(500).json({
      message: "Server error",
    });
  }
});

// =====================================================
// STUDENT: REGISTER FOR AN EVENT
// POST /api/events/:id/register
// =====================================================

router.post(
  "/:id/register",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "STUDENT") {
        return res.status(403).json({
          message: "Only students can register for events",
        });
      }

      const eventId = req.params.id;

      const [events] = await db.query(
        "SELECT id FROM events WHERE id = ?",
        [eventId]
      );

      if (events.length === 0) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      try {
        await db.query(
          `INSERT INTO event_registrations
          (event_id, student_id)
          VALUES (?, ?)`,
          [eventId, req.user.id]
        );
      } catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: "Already registered for this event",
          });
        }

        throw error;
      }

      return res.status(201).json({
        message: "Event registration successful",
      });
    } catch (error) {
      console.error("Event registration error:", error);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// =====================================================
// STUDENT: VIEW OWN EVENT REGISTRATIONS
// GET /api/events/my-registrations
// =====================================================

router.get(
  "/my-registrations",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "STUDENT") {
        return res.status(403).json({
          message: "Only students can access this route",
        });
      }

      const [registrations] = await db.query(
        `SELECT
          r.id,
          r.event_id,
          r.registered_at,
          e.title,
          e.description,
          e.event_date,
          e.event_time,
          e.location,
          e.poster_url
        FROM event_registrations r
        JOIN events e ON r.event_id = e.id
        WHERE r.student_id = ?
        ORDER BY e.event_date ASC`,
        [req.user.id]
      );

      return res.json({
        registrations,
      });
    } catch (error) {
      console.error("Fetch event registrations error:", error);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// =====================================================
// TEACHER: VIEW REGISTRATIONS FOR AN EVENT
// GET /api/events/:id/registrations
// =====================================================

router.get(
  "/:id/registrations",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "TEACHER") {
        return res.status(403).json({
          message: "Only teachers can view registrations",
        });
      }

      const eventId = req.params.id;

      const [registrations] = await db.query(
        `SELECT
          r.id,
          r.registered_at,
          u.name AS student_name,
          u.user_id AS student_user_id,
          u.department
        FROM event_registrations r
        JOIN users u ON r.student_id = u.id
        WHERE r.event_id = ?
        ORDER BY r.registered_at ASC`,
        [eventId]
      );

      return res.json({
        registrations,
      });
    } catch (error) {
      console.error("Fetch event registrations error:", error);

      return res.status(500).json({
        message: "Server error",
      });
    }
  }
);

// =====================================================
// MULTER ERROR HANDLER
// =====================================================

router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "Image must be smaller than 5 MB",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.status(400).json({
        message: "Only one event poster can be uploaded",
      });
    }

    return res.status(400).json({
      message: error.message,
    });
  }

  if (
    error.message ===
    "Only JPG, PNG, WEBP, and GIF images are allowed."
  ) {
    return res.status(400).json({
      message: error.message,
    });
  }

  return next(error);
});

module.exports = router;