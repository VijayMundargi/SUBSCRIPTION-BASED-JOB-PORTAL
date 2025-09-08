const express = require("express");
const ErrorMiddleware = require("./middleware/ErrorMiddleware.js");
const cookieParser = require("cookie-parser")
const app = express();
const cors = require('cors')

// 🔹 parse JSON BEFORE routes


app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser())


// 🔹 Routes
const auth = require("./routes/authRoute.route.js");
app.use("/api/v1", auth);

const jobs = require("./routes/jobRoutes.route.js");
app.use("/api/v1", jobs);

const payment = require("./routes/paymentRoute.route.js")
app.use("/api/v1", payment);
// 🔹 Error handler (should be last)
app.use(ErrorMiddleware);

module.exports = app;
