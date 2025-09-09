const express = require("express");
const isAuthenticated = require("../middleware/auth.js");
const {
  Login,
  Register,
  Logout,
  profile,
  updateProfile,
} = require("../controller/authController.controller.js");
const multer = require("multer");
const path = require("path");

// ====== Multer Setup for Resume Upload ======
// Store file in memory (buffer) instead of disk
const storage = multer.memoryStorage();

// Optional: validate file types (PDF/DOC/DOCX only)
const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, DOC, and DOCX files are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

const router = express.Router();

// ====== Auth Routes ======
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", Logout);
router.get("/me", isAuthenticated, profile);

// ====== Update Profile (with resume upload) ======
router.put(
  "/me/update",
  isAuthenticated,
  upload.single("resume"), // handles resume file upload
  updateProfile
);

module.exports = router;
