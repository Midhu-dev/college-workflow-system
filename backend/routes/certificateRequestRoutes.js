const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
  STUDENT
  Create certificate request
  POST /api/certificate-requests
*/
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can request certificates",
      });
    }

    const {
      certificateType,
      purpose,
      additionalDetails,
    } = req.body;

    if (!certificateType || !purpose) {
      return res.status(400).json({
        message: "Certificate type and purpose are required",
      });
    }

    const requestId = `CR-${Date.now()}`;

    const [result] = await db.query(
      `INSERT INTO certificate_requests
      (
        request_id,
        student_id,
        certificate_type,
        purpose,
        additional_details
      )
      VALUES (?, ?, ?, ?, ?)`,
      [
        requestId,
        req.user.id,
        certificateType,
        purpose,
        additionalDetails || null,
      ]
    );

    res.status(201).json({
      message: "Certificate request submitted successfully",

      request: {
        id: result.insertId,
        requestId,
        certificateType,
        purpose,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Certificate request error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  STUDENT
  View own certificate requests
  GET /api/certificate-requests/my
*/
router.get("/my", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can access this route",
      });
    }

    const [requests] = await db.query(
      `SELECT
        id,
        request_id,
        certificate_type,
        purpose,
        additional_details,
        status,
        created_at,
        processed_at
      FROM certificate_requests
      WHERE student_id = ?
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      requests,
    });
  } catch (error) {
    console.error("Fetch certificate requests error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  View pending certificate requests
  GET /api/certificate-requests/pending
*/
router.get("/pending", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can access this route",
      });
    }

    const [requests] = await db.query(
      `SELECT
        r.id,
        r.request_id,
        r.certificate_type,
        r.purpose,
        r.additional_details,
        r.status,
        r.created_at,
        u.name AS student_name,
        u.user_id AS student_user_id,
        u.department
      FROM certificate_requests r
      JOIN users u ON r.student_id = u.id
      WHERE r.status IN ('PENDING', 'PROCESSING')
      ORDER BY r.created_at ASC`
    );

    res.json({
      requests,
    });
  } catch (error) {
    console.error("Fetch pending certificate requests error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  Update certificate request status
  PATCH /api/certificate-requests/:id/status
*/
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can process certificate requests",
      });
    }

    const { status } = req.body;
    const requestId = req.params.id;

    const allowedStatuses = [
      "PROCESSING",
      "COMPLETED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Status must be PROCESSING, COMPLETED or REJECTED",
      });
    }

    const [result] = await db.query(
      `UPDATE certificate_requests
       SET status = ?,
           processed_by = ?,
           processed_at = NOW()
       WHERE id = ?
       AND status IN ('PENDING', 'PROCESSING')`,
      [
        status,
        req.user.id,
        requestId,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message:
          "Certificate request not found or already completed",
      });
    }

    res.json({
      message: `Certificate request ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error(
      "Certificate request status update error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;