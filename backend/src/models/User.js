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
    required: [true, "Please enter your number"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [6, "Password must be at least 6 characters"],
    select: false, 
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
    public_id: { type: String },
    url: { type: String }, // e.g., Cloudinary URL
  },

 
  resume: {
    public_id: { type: String },
    url: { type: String }, // uploaded file (PDF/DOC) URL
  },

 
  jobProfile: {
    title: { type: String },          // e.g., "Full Stack Developer"
    company: { type: String },        // optional
    experience: { type: Number },     // in years
    skills: [String],                 // array of skills
  },

 
  joinedAt: {
    type: Date,
    default: Date.now,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  ResetPasswordToken: String,
  ResetPasswordExpire: String,
});


userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { _id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: "10d" }
  );
};

const User = mongoose.model("User", userSchema);

module.exports = User;
