const express = require("express");
const cors = require("cors");
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

app.use(cors());
app.use(express.json());

/*
  Basic API test
*/
app.get("/", (req, res) => {
  res.json({
    message: "College Workflow API is running",
  });
});

/*
  Database connection test
*/
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

/*
  Authentication routes
*/
app.use("/api/auth", authRoutes);

/*
  Leave / OD routes
*/
app.use("/api/leave-od", leaveOdRoutes);

/*
  Class Issue routes
*/
app.use("/api/class-issues", classIssueRoutes);

/*
  Certificate Upload routes
*/
app.use(
  "/api/certificate-uploads",
  certificateUploadRoutes
);

/*
  Certificate Request routes
*/
app.use(
  "/api/certificate-requests",
  certificateRequestRoutes
);

/*
  Event routes
*/
app.use("/api/events", eventRoutes);

/*
  Protected authentication test
*/
app.get("/api/test-auth", authenticateToken, (req, res) => {
  res.json({
    message: "Authentication successful",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});