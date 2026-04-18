const mongoose = require("mongoose");
const { constant, userStatuses, loyaltyTiers } = require("../utils");
const employeeDetailsSchema = require("./Schemas/employeeDetails.schema");
const pilotDetailsSchema = require("./Schemas/pilotDetails.schema");
const personalDetailsSchema = require("./Schemas/personalDetails.schema");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [1, "Name must be at least 1 characters long"],
      maxLength: [100, "Name cannot exceed 100 characters long"],
    },
    lastName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [1, "Name must be at least 1 characters long"],
      maxLength: [100, "Name cannot exceed 100 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
      maxLength: [254, "Email cannot exceed 254 characters"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [8, "Password must be at least 8 characters long"],
      select: false,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone Number is required"],
      trim: true,
      unique: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },
    role: {
      type: String,
      enum: [
        constant.airline_admin,
        constant.user,
        constant.pilot,
        constant.super_admin,
        constant.staff,
      ],
      default: constant.user,
    },
    userStatus: {
      type: String,
      enum: [
        userStatuses.approved,
        userStatuses.pending,
        userStatuses.blocked,
        userStatuses.suspended,
      ],
      required: true,
      default: userStatuses.approved,
    },
    airlineId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AirLines",
      required: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    }, 
    loyaltyPoints: {
      type: Number,
      min: 0,
    },
    loyaltyTier: {
      type: String,
      enum: [
        loyaltyTiers.bronze,
        loyaltyTiers.silver,
        loyaltyTiers.gold,
        loyaltyTiers.platinum,
      ],
    },
    // Employee Details (staff/admin/pilot)
    employeeDetails: employeeDetailsSchema,
    pilotDetails: pilotDetailsSchema,
    personalDetails: personalDetailsSchema,

    isActive: {
      type: Boolean,
      default: false,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    phoneVerified: {
      type: Boolean,
      default: false,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("User", userSchema);
