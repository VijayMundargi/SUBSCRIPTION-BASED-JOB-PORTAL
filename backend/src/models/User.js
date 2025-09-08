const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  number: {
    type: String,
    required: [true, "Please enter your Number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false, // ✅ hide password by default
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  subscription: {
    id: String,
    status: String,
    plan: String,
  },
  avatar: {
    public_id: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});

// ✅ Fixed getJWTToken method
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET, // fixed typo
    { expiresIn: "10d" }   // must be inside jwt.sign options
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
