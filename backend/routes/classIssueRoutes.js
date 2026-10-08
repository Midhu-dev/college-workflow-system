const express = require("express");
const db = require("../db");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

/*
  STUDENT
  Submit a class issue
  POST /api/class-issues
*/
router.post("/", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can report class issues",
      });
    }

    const {
      issueType,
      title,
      location,
      description,
    } = req.body;

    if (!issueType || !title || !description) {
      return res.status(400).json({
        message: "Issue type, title and description are required",
      });
    }

    const issueId = `ISS-${Date.now()}`;

    const [result] = await db.query(
      `INSERT INTO class_issues
      (
        issue_id,
        student_id,
        issue_type,
        title,
        location,
        description
      )
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        issueId,
        req.user.id,
        issueType,
        title,
        location || null,
        description,
      ]
    );

    res.status(201).json({
      message: "Class issue reported successfully",
      issue: {
        id: result.insertId,
        issueId,
        status: "PENDING",
      },
    });
  } catch (error) {
    console.error("Class issue submission error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  STUDENT
  View own class issues
  GET /api/class-issues/my
*/
router.get("/my", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "STUDENT") {
      return res.status(403).json({
        message: "Only students can access this route",
      });
    }

    const [issues] = await db.query(
      `SELECT
        id,
        issue_id,
        issue_type,
        title,
        location,
        description,
        status,
        created_at,
        handled_at
      FROM class_issues
      WHERE student_id = ?
      ORDER BY created_at DESC`,
      [req.user.id]
    );

    res.json({
      issues,
    });
  } catch (error) {
    console.error("Fetch student issues error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  View pending class issues
  GET /api/class-issues/pending
*/
router.get("/pending", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can access this route",
      });
    }

    const [issues] = await db.query(
      `SELECT
        i.id,
        i.issue_id,
        i.issue_type,
        i.title,
        i.location,
        i.description,
        i.status,
        i.created_at,
        u.name AS student_name,
        u.user_id AS student_user_id,
        u.department
      FROM class_issues i
      JOIN users u ON i.student_id = u.id
      WHERE i.status = 'PENDING'
      ORDER BY i.created_at ASC`
    );

    res.json({
      issues,
    });
  } catch (error) {
    console.error("Fetch pending issues error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

/*
  TEACHER
  Resolve / Reject class issue
  PATCH /api/class-issues/:id/status
*/
router.patch("/:id/status", authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== "TEACHER") {
      return res.status(403).json({
        message: "Only teachers can update class issues",
      });
    }

    const { status } = req.body;
    const issueId = req.params.id;

    if (status !== "RESOLVED" && status !== "REJECTED") {
      return res.status(400).json({
        message: "Status must be RESOLVED or REJECTED",
      });
    }

    const [result] = await db.query(
      `UPDATE class_issues
       SET status = ?,
           handled_by = ?,
           handled_at = NOW()
       WHERE id = ?
       AND status = 'PENDING'`,
      [status, req.user.id, issueId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Issue not found or already handled",
      });
    }

    res.json({
      message: `Issue ${status.toLowerCase()} successfully`,
    });
  } catch (error) {
    console.error("Update class issue error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;