const express = require("express");
const multer = require("multer");
const path = require("path");

const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
  Multer configuration
*/

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() +
      "-" +
      Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new Error("Only PDF, JPG and PNG files are allowed")
      );
    }

    cb(null, true);
  },
});

/*
  STUDENT
  Upload certificate
  POST /api/certificate-uploads
*/
router.post(
  "/",
  authenticateToken,
  upload.single("certificate"),
  async (req, res) => {
    try {
      if (req.user.role !== "STUDENT") {
        return res.status(403).json({
          message: "Only students can upload certificates",
        });
      }

      if (!req.file) {
        return res.status(400).json({
          message: "Certificate file is required",
        });
      }

      const { certificateType } = req.body;

      if (!certificateType) {
        return res.status(400).json({
          message: "Certificate type is required",
        });
      }

      const uploadId = `CERT-${Date.now()}`;

      const filePath = req.file.path;

      const [result] = await db.query(
        `INSERT INTO certificate_uploads
        (
          upload_id,
          student_id,
          certificate_type,
          file_name,
          file_path
        )
        VALUES (?, ?, ?, ?, ?)`,
        [
          uploadId,
          req.user.id,
          certificateType,
          req.file.originalname,
          filePath,
        ]
      );

      res.status(201).json({
        message: "Certificate uploaded successfully",

        upload: {
          id: result.insertId,
          uploadId,
          certificateType,
          fileName: req.file.originalname,
          status: "PENDING",
        },
      });
    } catch (error) {
      console.error("Certificate upload error:", error);

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

/*
  STUDENT
  View own certificate uploads
  GET /api/certificate-uploads/my
*/
router.get("/my", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can access this route",
      });
    }

    const [uploads] = await db.query(
      `SELECT
        id,
        upload_id,
        certificate_type,
        file_name,
        status,
        created_at,
        verified_at
      FROM certificate_uploads
      WHERE student_id = ?
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      uploads,
    });
  } catch (error) {
    console.error("Fetch certificate uploads error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  View pending certificate uploads
  GET /api/certificate-uploads/pending
*/
router.get("/pending", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can access this route",
      });
    }

    const [uploads] = await db.query(
      `SELECT
        c.id,
        c.upload_id,
        c.certificate_type,
        c.file_name,
        c.file_path,
        c.status,
        c.created_at,
        u.name AS student_name,
        u.user_id AS student_user_id,
        u.department
      FROM certificate_uploads c
      JOIN users u ON c.student_id = u.id
      WHERE c.status = 'PENDING'
      ORDER BY c.created_at ASC`
    );

    res.json({
      uploads,
    });
  } catch (error) {
    console.error("Fetch pending certificates error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  Verify / Reject certificate
  PATCH /api/certificate-uploads/:id/status
*/
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can verify certificates",
      });
    }

    const { status } = req.body;
    const uploadId = req.params.id;

    if (status !== "VERIFIED" && status !== "REJECTED") {
      return res.status(400).json({
        message: "Status must be VERIFIED or REJECTED",
      });
    }

    const [result] = await db.query(
      `UPDATE certificate_uploads
       SET status = ?,
           verified_by = ?,
           verified_at = NOW()
       WHERE id = ?
       AND status = 'PENDING'`,
      [status, req.user.id, uploadId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Certificate not found or already reviewed",
      });
    }

    res.json({
      message: `Certificate ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Certificate verification error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;