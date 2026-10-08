const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
  STUDENT
  Apply for Leave / OD

  POST /api/leave-od
*/
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can submit Leave/OD requests",
      });
    }

    const {
      requestType,
      leaveType,
      odType,
      activityName,
      fromDate,
      fromTime,
      toDate,
      toTime,
      reason,
    } = req.body;

    if (
      !requestType ||
      !fromDate ||
      !fromTime ||
      !toDate ||
      !toTime ||
      !reason
    ) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    if (!["LEAVE", "OD"].includes(requestType)) {
      return res.status(400).json({
        message: "Invalid request type",
      });
    }

    /*
      Validate date and time
    */
    const fromDateTime = new Date(
      `${fromDate}T${fromTime}`
    );

    const toDateTime = new Date(
      `${toDate}T${toTime}`
    );

    if (toDateTime < fromDateTime) {
      return res.status(400).json({
        message:
          "To date/time cannot be before the from date/time",
      });
    }

    /*
      Generate request ID
    */
    const requestId = `${
      requestType === "LEAVE" ? "LV" : "OD"
    }-${Date.now()}`;

    /*
      Insert request
    */
    const [result] = await db.query(
      `INSERT INTO leave_od_requests
      (
        request_id,
        student_id,
        request_type,
        leave_type,
        od_type,
        activity_name,
        from_date,
        from_time,
        to_date,
        to_time,
        reason,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING')`,
      [
        requestId,
        req.user.id,
        requestType,
        leaveType || null,
        odType || null,
        activityName || null,
        fromDate,
        fromTime,
        toDate,
        toTime,
        reason,
      ]
    );

    res.status(201).json({
      message: "Request submitted successfully",

      request: {
        id: result.insertId,
        requestId,
        requestType,
        fromDate,
        fromTime,
        toDate,
        toTime,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error(
      "Leave/OD creation error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  STUDENT
  View own requests

  GET /api/leave-od/my
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
        request_type,
        leave_type,
        od_type,
        activity_name,
        from_date,
        from_time,
        to_date,
        to_time,
        reason,
        status,
        created_at,
        reviewed_at
      FROM leave_od_requests
      WHERE student_id = ?
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      requests,
    });
  } catch (error) {
    console.error(
      "Fetch student Leave/OD error:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  View pending Leave / OD requests

  GET /api/leave-od/pending
*/
router.get(
  "/pending",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "TEACHER") {
        return res.status(403).json({
          message:
            "Only teachers can access pending requests",
        });
      }

      const [requests] = await db.query(
        `SELECT
          r.id,
          r.request_id,
          r.request_type,
          r.leave_type,
          r.od_type,
          r.activity_name,
          r.from_date,
          r.from_time,
          r.to_date,
          r.to_time,
          r.reason,
          r.status,
          r.created_at,
          u.name AS student_name,
          u.user_id AS student_user_id,
          u.department
        FROM leave_od_requests r
        JOIN users u
          ON r.student_id = u.id
        WHERE r.status = 'PENDING'
        ORDER BY r.created_at DESC`
      );

      res.json({
        requests,
      });
    } catch (error) {
      console.error(
        "Fetch pending Leave/OD error:",
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
  Approve / Reject Leave / OD

  PATCH /api/leave-od/:id/status
*/
router.patch(
  "/:id/status",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "TEACHER") {
        return res.status(403).json({
          message:
            "Only teachers can update request status",
        });
      }

      const { status } = req.body;

      if (
        !["APPROVED", "REJECTED"].includes(
          status
        )
      ) {
        return res.status(400).json({
          message:
            "Status must be APPROVED or REJECTED",
        });
      }

      const requestId = req.params.id;

      const [result] = await db.query(
        `UPDATE leave_od_requests
         SET
           status = ?,
           reviewed_by = ?,
           reviewed_at = NOW()
         WHERE id = ?`,
        [
          status,
          req.user.id,
          requestId,
        ]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Request not found",
        });
      }

      res.json({
        message:
          `Request ${status.toLowerCase()} successfully`,
      });
    } catch (error) {
      console.error(
        "Update Leave/OD status error:",
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
  View ONLY the latest approved Leave/OD
  for each student

  GET /api/leave-od/approved/current
*/
router.get(
  "/approved/current",
  authenticateToken,
  async (req, res) => {
    try {
      if (req.user.role !== "TEACHER") {
        return res.status(403).json({
          message:
            "Only teachers can access this route",
        });
      }

      /*
        For every student, select only the
        latest approved request.

        Example:

        Midhun
        Leave - 5 Oct  -> ignored

        Midhun
        Leave - 7 Oct  -> shown
      */

      const [requests] = await db.query(
        `SELECT
          r.id,
          r.request_id,
          r.request_type,
          r.leave_type,
          r.od_type,
          r.activity_name,
          r.from_date,
          r.from_time,
          r.to_date,
          r.to_time,
          r.reason,
          r.status,
          r.created_at,
          u.name AS student_name,
          u.user_id AS student_user_id,
          u.department
        FROM leave_od_requests r
        JOIN users u
          ON r.student_id = u.id
        WHERE r.status = 'APPROVED'
          AND r.id = (
            SELECT MAX(r2.id)
            FROM leave_od_requests r2
            WHERE r2.student_id = r.student_id
              AND r2.status = 'APPROVED'
          )
        ORDER BY
          r.request_type ASC,
          r.from_date ASC,
          r.from_time ASC`
      );

      res.json({
        requests,
      });
    } catch (error) {
      console.error(
        "Fetch latest approved Leave/OD error:",
        error
      );

      res.status(500).json({
        message: "Server error",
      });
    }
  }
);

module.exports = router;