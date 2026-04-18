// utils/emailService.js OR config/mailer.js

const nodemailer = require("nodemailer");
const { serverConfig } = require("../config");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: serverConfig.EMAIL_SENDER,
    pass: serverConfig.EMAIL_APPPASS, // App password (NOT normal password)
  },
});

module.exports = transporter;