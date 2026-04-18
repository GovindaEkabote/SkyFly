const mongoose = require("mongoose");
const { constant, purpose } = require("../utils");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
  },
  otp: {
    type: String,
  },
  purpose: {
    type: String,
    enum: [purpose.register, purpose.changePassword, purpose.changeEmail],
  },
  expiresAt: Date,
});

module.exports = mongoose.model("OTP", otpSchema);
