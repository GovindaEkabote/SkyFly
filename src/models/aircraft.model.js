const mongooes = require("mongoose");
const { maintenanceStatus } = require("../utils");

const aircraftSchema = new mongooes.Schema(
  {
    registration: {
      type: String,
      required: true,
      uppercase: true,
    },
    model: {
      type: String,
      required: true,
    },
    manufacturer: String,
    airline: {
      type: mongooes.Schema.Types.ObjectId,
      ref: "Airline",
      required: true,
    },
    capacity: {
      total: Number,
      bussiness: Number,
      economy: Number,
    },
    manufacturingYear: Number,
    lastMaintenanceDate: Date,
    nextMaintenanceDue: Date,
    flightHours: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: [
        maintenanceStatus.scheduled,
        maintenanceStatus.in_progress,
        maintenanceStatus.completed,
        maintenanceStatus.delayed,
        maintenanceStatus.cancelled,
      ],
      default: maintenanceStatus.scheduled,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

module.exports = mongooes.model("Aircraft", aircraftSchema);
