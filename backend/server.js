const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const db = require("./db");

const authRoutes = require("./routes/authRoutes");
const leaveOdRoutes = require("./routes/leaveOdRoutes");
const classIssueRoutes = require("./routes/classIssueRoutes");
const certificateUploadRoutes = require("./routes/certificateUploadRoutes");
const certificateRequestRoutes = require("./routes/certificateRequestRoutes");
const eventRoutes = require("./routes/eventRoutes");

const authenticateToken = require("./middleware/authMiddleware");

const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// Serve uploaded files from the backend/uploads directory.
// Example: http://localhost:5000/uploads/event-123.png
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);

// =====================================================
// BASIC API TEST
// =====================================================

app.get("/", (req, res) => {
  res.json({
    message: "College Workflow API is running",
  });
});

// =====================================================
// DATABASE CONNECTION TEST
// =====================================================

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS result");

    res.json({
      message: "MySQL connected successfully",
      result: rows[0].result,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      message: "Database connection failed",
    });
  }
});

// =====================================================
// AUTHENTICATION ROUTES
// =====================================================

app.use("/api/auth", authRoutes);

// =====================================================
// LEAVE / OD ROUTES
// =====================================================

app.use("/api/leave-od", leaveOdRoutes);

// =====================================================
// CLASS ISSUE ROUTES
// =====================================================

app.use("/api/class-issues", classIssueRoutes);

// =====================================================
// CERTIFICATE UPLOAD ROUTES
// =====================================================

app.use(
  "/api/certificate-uploads",
  certificateUploadRoutes
);

// =====================================================
// CERTIFICATE REQUEST ROUTES
// =====================================================

app.use(
  "/api/certificate-requests",
  certificateRequestRoutes
);

// =====================================================
// EVENT ROUTES
// =====================================================

app.use("/api/events", eventRoutes);

// =====================================================
// PROTECTED AUTHENTICATION TEST
// =====================================================

app.get("/api/test-auth", authenticateToken, (req, res) => {
  res.json({
    message: "Authentication successful",
    user: req.user,
  });
});

// =====================================================
// GLOBAL ERROR HANDLER
// =====================================================

app.use((error, req, res, next) => {
  console.error("Unhandled server error:", error);

  if (res.headersSent) {
    return next(error);
  }

  res.status(500).json({
    message: "Internal server error",
  });
});

// =====================================================
// START SERVER
// =====================================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Uploaded files served from /uploads`);
});