// services/email.service.js

const { transporter } = require("../utils");


const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "OTP Verification",
    html: `
      <h3>Your OTP Code</h3>
      <h2>${otp}</h2>
      <p>This OTP will expire in 5 minutes</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = {
  sendOtpEmail,
};