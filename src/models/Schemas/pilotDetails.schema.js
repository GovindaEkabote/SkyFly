const mongoose = require("mongoose");
const { licenseType, pilotStatus } = require("../../utils");

const pilotDetailsSchema = new mongoose.Schema(
  {
    licenseNumber: {
      type: String,
      required: true,
      trim: true,
    },
    licenseType: {
      type: String,
      enum: [
        licenseType.ATPL,
        licenseType.CPL,
        licenseType.PPL,
        licenseType.SPL,
      ],
      required: true,
    },
    licenseExpiry: {
      type: String,
      required: true,
    },
    flyingHours: {
      type: Number,
      min: 0,
      default: 0,
    },
    medicalCertificateValidTill: {
      type: String,
      required: true,
    },
    pilotStatus: {
      type: String,
      enum: [pilotStatus.active, pilotStatus.inactive, pilotStatus.suspended],
      default: pilotStatus.active,
    },
    baseAirport: {
      type: String,
      trim: true,
    },
  },

  { _id: false },
);

module.exports = pilotDetailsSchema;
