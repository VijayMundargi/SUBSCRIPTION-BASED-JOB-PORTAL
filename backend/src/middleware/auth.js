const jwt = require("jsonwebtoken");
const catchAsyncError = require("./catachAsyncError.js");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../models/User");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(new ErrorHandler("Not logged in", 401));
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }

  const user = await User.findById(decoded._id);
  if (!user) return next(new ErrorHandler("User not found", 404));

  req.user = user;
  next();
});

module.exports = isAuthenticated;
