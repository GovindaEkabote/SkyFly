const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
    },
    coordinates: {
      type: [Number],
      required: true,
    },
    timezone: {
      type: String,
    },
    terminals: [
      {
        name: String,
        gates: [String],
      },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "under maintenance"],
      default: "active",
    },
    operatingAirlines: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Airline",
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Airport", airportSchema);
