const mongoose = require("mongoose");
const { airlineStatues } = require("../utils");

const airlineSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      match: /^[A-Z]{2,3}$/,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    country: {
      type: String,
      required: true,
      index: true,
    },
    headquarters: {
      city: String,
      address: String,
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    contactInfo: {
      phone: {
        type: String,
      },
      email: {
        type: String,
        lowercase: true,
        match: /^\S+@\S+\.\S+$/,
      },
      website: {
        type: String,
        match: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      },
    },
    allianceDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alliance",
    },
    status: {
      type: String,
      enum: [
        airlineStatues.activeAirline,
        airlineStatues.inactiveAirline,
        airlineStatues.suspendedAirline,
      ],
      default: airlineStatues.activeAirline,
      index: true,
    },
    hubs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airport",
      },
    ],
    maintenanceSummary: {
      lastMaintenanceDate: Date,
      nextMaintenanceDue: Date,
      totalChecks: { type: Number, default: 0 },
      activeMaintenance: { type: Number, default: 0 },
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  },
);

// Indexes
airlineSchema.index({ code: 1, status: 1 });
airlineSchema.index({ name: "text", country: "text" });

module.exports = mongoose.model("Airline", airlineSchema);
