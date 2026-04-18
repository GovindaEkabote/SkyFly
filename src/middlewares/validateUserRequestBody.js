const User = require("../models/user-model");
const { StatusCodes } = require("http-status-codes");
const { constant, userStatuses, loyaltyTiers } = require("../utils");

const validateUserRequestBody = async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, phoneNumber } = req.body;

    // First Name
    if (!firstName || firstName.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'firstName' field is required.",
      });
    }

    // Last Name
    if (!lastName || lastName.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'lastName' field is required.",
      });
    }

    // Password
    if (!password || password.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'password' field is required.",
      });
    }

    // Phone Number
    if (!phoneNumber || phoneNumber.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'phoneNumber' field is required.",
      });
    }

    // Email
    if (!email || email.trim() === "") {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'email' field is required.",
      });
    }

    // Check existing phone number
    const existingUserByPhoneNumber = await User.findOne({ phoneNumber });
    if (existingUserByPhoneNumber) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'phoneNumber' already exists.",
      });
    }

    // Check existing email
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        message: "Failed! Bad Request — 'email' already exists.",
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal Server Error during validation",
    });
  }
};

const validateUserStatusAndUserType = (req, res, next) => {
  try {
    const { role, userStatus, loyaltyTier } = req.body;

    // ROLE VALIDATION
    const validRoles = [
      constant.airline_admin,
      constant.user,
      constant.super_admin,
      constant.staff,
      constant.pilot,
    ];

    if (role && !validRoles.includes(req.body.role)) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message:
          "Invalid Role. Allowed values: USER | AIRLINE_ADMIN | SUPER_ADMIN | STAFF | PILOT",
      });
    }

    // LOYALTY TIER VALIDATION
    const validLoyaltyTiers = [
      loyaltyTiers.bronze,
      loyaltyTiers.silver,
      loyaltyTiers.gold,
      loyaltyTiers.platinum,
    ];

    if (loyaltyTier && !validLoyaltyTiers.includes(loyaltyTier.toLowerCase())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message:
          "Invalid Tier. Allowed values: BRONZE | SILVER | GOLD | PLATINUM",
      });
    }

    // USER STATUS VALIDATION
    const validStatuses = [
      userStatuses.approved,
      userStatuses.pending,
      userStatuses.blocked,
    ];

    if (userStatus && !validStatuses.includes(userStatus.toLowerCase())) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Invalid Status. Allowed values: PENDING | APPROVED | BLOCKED",
      });
    }

    next();
  } catch (error) {
    console.error("Validation error:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      message: "Internal Server Error during validation",
    });
  }
};

module.exports = {
  validateUserRequestBody,
  validateUserStatusAndUserType,
};
