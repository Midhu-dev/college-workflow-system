const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
  TEACHER
  Create an event
  POST /api/events
*/
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can create events",
      });
    }

    const {
      title,
      description,
      eventDate,
      eventTime,
      location,
      posterUrl,
    } = req.body;

    if (!title || !eventDate) {
      return res.status(400).json({
        message: "Title and event date are required",
      });
    }

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
        title,
        description || null,
        eventDate,
        eventTime || null,
        location || null,
        posterUrl || null,
        req.user.id,
      ]
    );

    res.status(201).json({
      message: "Event created successfully",

      event: {
        id: result.insertId,
        title,
        eventDate,
        eventTime: eventTime || null,
        location: location || null,
      },
    });
  } catch (error) {
    console.error("Event creation error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  STUDENT + TEACHER
  View all events
  GET /api/events
*/
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

    res.json({
      events,
    });
  } catch (error) {
    console.error("Fetch events error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  STUDENT
  Register for an event
  POST /api/events/:id/register
*/
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

      /*
        Check whether event exists
      */
      const [events] = await db.query(
        "SELECT id FROM events WHERE id = ?",
        [eventId]
      );

      if (events.length === 0) {
        return res.status(404).json({
          message: "Event not found",
        });
      }

      /*
        Register student
      */
      try {
        await db.query(
          `INSERT INTO event_registrations
          (event_id, student_id)
          VALUES (?, ?)`,
          [eventId, req.user.id]
        );
      } catch (error) {
        /*
          Duplicate registration
        */
        if (error.code === "ER_DUP_ENTRY") {
          return res.status(409).json({
            message: "Already registered for this event",
          });
        }

        throw error;
      }

      res.status(201).json({
        message: "Event registration successful",
      });
    } catch (error) {
      console.error("Event registration error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

/*
  STUDENT
  View own event registrations
  GET /api/events/my-registrations
*/
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
          e.location
        FROM event_registrations r
        JOIN events e ON r.event_id = e.id
        WHERE r.student_id = ?
        ORDER BY e.event_date ASC`,
        [req.user.id]
      );

      res.json({
        registrations,
      });
    } catch (error) {
      console.error(
        "Fetch event registrations error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

/*
  TEACHER
  View registrations for an event
  GET /api/events/:id/registrations
*/
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

      res.json({
        registrations,
      });
    } catch (error) {
      console.error(
        "Fetch event registrations error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;