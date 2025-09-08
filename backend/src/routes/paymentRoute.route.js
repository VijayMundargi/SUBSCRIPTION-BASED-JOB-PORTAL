const express = require("express");
const { processPayment, verifyPayment } = require("../controller/paymentController.controller.js");
const isAuthenticated = require("../middleware/auth.js");

const router = express.Router();

// 📌 Create Razorpay order (only logged-in users)
router.post("/subscription", isAuthenticated, processPayment);

// 📌 Verify payment and update subscription (only logged-in users)
router.post("/payment/verify", isAuthenticated, verifyPayment);

module.exports = router;
