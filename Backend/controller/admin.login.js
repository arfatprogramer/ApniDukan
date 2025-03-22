const adminModel = require("../models/adminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie"); // Import cookie package for Vercel

const adminLoginController = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        message: "Method Not Allowed",
        error: true,
        success: false,
      });
    }

    const { username, password } = req.body;

    // Validate input
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
        error: true,
        success: false,
      });
    }

    // Find admin by email
    const admin = await adminModel.findOne({ email: username });
    if (!admin) {
      return res.status(404).json({
        message: "Admin not found",
        error: true,
        success: false,
      });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Invalid credentials",
        error: true,
        success: false,
      });
    }

    // Generate token
    const token = jwt.sign(
      { _id: admin._id, role: "admin" },
      process.env.ADMIN_TOKEN_SECRET_KEY,
      { expiresIn: "8h" }
    );

    const cookieOptions = cookie.serialize("adminToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours in seconds
    });

    res.setHeader("Set-Cookie", cookieOptions);
    res.status(200).json({
      message: "Login successful",
      data: { username: admin.email },
      token, // Send token in response for additional use cases
      error: false,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
      error: true,
      success: false,
    });
  }
};

module.exports= adminLoginController; // Ensure proper export for Vercel
