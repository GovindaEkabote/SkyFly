const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema(
  {
    flightNumber: { type: String, required: true },
    airline: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Airline",
      required: true,
    },
    aircraft: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Aircraft",
      required: true,
    },
    route: {
      origin: {
        airport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport" },
        terminal: String,
        gate: String,
        scheduledTime: Date,
      },
      destination: {
        airport: { type: mongoose.Schema.Types.ObjectId, ref: "Airport" },
        terminal: String,
        gate: String,
        scheduledTime: Date,
      },
    },
    duration: Number, // in minutes
    distance: Number, // in kilometers
    dayOfWeek: [Number], // 0 (Sunday) to 6 (Saturday)
    effectiveFrom: Date,
    effectiveTo: Date,
    status: {
      type: String,
      enum: ["scheduled", "active", "cancelled", "completed", "delayed"],
      default: "scheduled",
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Flight", flightSchema);
