const OTP = require("../models/otp.model");
const { generateOtp } = require("../utils");
const { emailService } = require("./email.service");

const sendOtp = async (email, purpose, userId = null) => {
  const otp = generateOtp();

  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 min

  await OTP.create({
    userId,
    email,
    otp,
    purpose,
    expiresAt,
  });

  await emailService.sendOtpEmail(email, otp);
};

const verifyOtp = async (email, otp, purpose) => {
  const record = await OTP.findOne({ email, otp, purpose });

  if (!record) {
    throw new Error("Invalid OTP");
  }

  if (record.expiresAt < new Date()) {
    throw new Error("OTP expired");
  }

  return true;
};

module.exports = {
  sendOtp,
  verifyOtp,
};
