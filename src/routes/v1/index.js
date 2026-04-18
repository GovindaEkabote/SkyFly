const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers");
const { validationUser, validateUserStatus } = require("../../middlewares");

router.post(
  "/signup",
  validationUser,
  validateUserStatus,
  authController.signUp,
);

router.get("/login", authController.login);
router.get("/logout", authController.logout)
router.post("/auth/send-register-otp", authController.sendRegisterOtp)

module.exports = router;

// POST /auth/register
// POST /auth/login
// POST /auth/logout
// POST /auth/refresh-token
// POST /auth/verify-otp
// POST /auth/resend-otp
// POST /auth/forgot-password
// POST /auth/reset-password
