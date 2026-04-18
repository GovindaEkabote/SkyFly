const express = require("express");
const router = express.Router();
const { authController } = require("../../controllers");
const { validationUser, validateUserStatus, token } = require("../../middlewares");

router.post(
  "/signup",
  validationUser,
  validateUserStatus,
  authController.signUp,
);

router.get("/login", authController.login);
router.get("/logout", authController.logout);
router.post("/auth/send-register-otp", authController.sendRegisterOtp);
router.post("/users/change-email/send-otp",token ,authController.sendChangeEmailOtp);
router.post("/users/change-email/verify",token ,authController.verifyChangeEmailOtp);
router.post("/forgot-password/send-otp",token ,authController.sendForgotPasswordOtp);
router.put("/reset/password",token ,authController.resetPassword);

module.exports = router;

// POST /auth/register
// POST /auth/login
// POST /auth/logout
// POST /auth/refresh-token
// POST /auth/verify-otp
// POST /auth/resend-otp
// POST /auth/forgot-password
// POST /auth/reset-password
