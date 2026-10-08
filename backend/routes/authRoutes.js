const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require("../db");

const router = express.Router();

/*
  REGISTER
  POST /api/auth/register
*/
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      userId,
      password,
      role,
      department,
    } = req.body;

    if (!name || !userId || !password || !role) {
      return res.status(400).json({
        message: "Name, user ID, password and role are required",
      });
    }

    if (role !== "STUDENT" && role !== "TEACHER") {
      return res.status(400).json({
        message: "Role must be STUDENT or TEACHER",
      });
    }

    // Check whether user already exists
    const [existingUsers] = await db.query(
      "SELECT id FROM users WHERE user_id = ?",
      [userId]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({
        message: "User ID already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      `INSERT INTO users
       (name, user_id, password, role, department)
       VALUES (?, ?, ?, ?, ?)`,
      [
        name,
        userId,
        hashedPassword,
        role,
        department || null,
      ]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: result.insertId,
        name,
        userId,
        role,
        department: department || null,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


/*
  LOGIN
  POST /api/auth/login
*/
router.post("/login", async (req, res) => {
  try {
    const {
      userId,
      password,
      role,
    } = req.body;

    if (!userId || !password || !role) {
      return res.status(400).json({
        message: "User ID, password and role are required",
      });
    }

    const [users] = await db.query(
      "SELECT * FROM users WHERE user_id = ? AND role = ?",
      [userId, role]
    );

    if (users.length === 0) {
      return res.status(401).json({
        message: "Invalid user ID or role",
      });
    }

    const user = users[0];

    // Compare entered password with hashed password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        id: user.id,
        userId: user.user_id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        userId: user.user_id,
        role: user.role,
        department: user.department,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
});


module.exports = router;