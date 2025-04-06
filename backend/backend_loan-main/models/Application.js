const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: {
      type: Number,
      required: [true, "Please provide the loan amount"],
    },
    tenure: {
      type: Number,
      required: [true, "Please provide the loan tenure in months"],
    },
    status: {
      type: String,
      enum: ["pending", "verified", "rejected", "approved"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Application", applicationSchema);
