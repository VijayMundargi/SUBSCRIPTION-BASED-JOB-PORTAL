const instance = require("../config/instance.js");
const User = require("../models/User.js");
const crypto = require("crypto");
const ErrorHandler = require("../utils/errorHandler.js");

const processPayment = async (req, res, next) => {
  const { plan } = req.body;

  if (!plan) {
    return res.status(400).json({ success: false, message: "Plan is required" });
  }

  const planPrices = {
    free: 0,
    basic: 1229 * 100,
    premium: 2499 * 100,
  };

  const amount = planPrices[plan];
  if (amount === undefined) {
    return res.status(400).json({ success: false, message: "Invalid plan" });
  }

  const user = await User.findById(req.user._id);

  // If user already subscribed
  if (user.subscription && user.subscription.status === "active") {
    return res.status(400).json({
      success: false,
      message: "You already have an active subscription",
      subscription: user.subscription,
    });
  }

 
  if (plan === "free") {
    user.subscription = {
      id: "free_plan",
      status: "active",
      plan: "free",
    };
    await user.save();

    return res.status(200).json({
      success: true,
      message: " Free plan activated",
      subscription: user.subscription,
    });
  }



  // Paid plan → Razorpay
  const options = { amount, currency: "INR" };
  const order = await instance.orders.create(options);

  res.status(200).json({ success: true, order });
};

const verifyPayment = async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, message: "Payment details missing" });
  }

  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: "Invalid signature, payment failed" });
  }

  // Update user subscription + role (only for basic/premium)
  const user = await User.findById(req.user._id);
  user.subscription = {
    id: razorpay_payment_id,
    status: "active",
    plan,
  };

  if (plan === "basic" || plan === "premium") {
    user.role = "admin"; //  only promote if paid plan
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: " Payment verified & subscription updated",
    subscription: user.subscription,
  });
};

module.exports = { processPayment, verifyPayment };
