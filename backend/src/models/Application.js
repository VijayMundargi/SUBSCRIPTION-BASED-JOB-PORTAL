const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    applicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Applied", "In review", "Rejected", "Accepted"],
      default: "Applied",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
