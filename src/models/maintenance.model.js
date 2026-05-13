const mongoose = require("mongoose");
const { constant, maintenance, priority } = require("../utils");

const maintenanceSchema = new mongoose.Schema(
  {
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
    type: {
      type: String,
      enum: [
        maintenance.A_check,
        maintenance.B_check,
        maintenance.C_check,
        maintenance.D_check,
      ],
      required: true,
    },
    priority: {
      type: String,
      enum: [priority.Low, priority.Medium, priority.High, priority.Critical],
      required: true,
    },
    status: {
      type: String,
      enum: [
        constant.maintenanceStatus.SCHEDULED,
        constant.maintenanceStatus.IN_PROGRESS,
        constant.maintenanceStatus.COMPLETED,
        constant.maintenanceStatus.DELAYED,
        constant.maintenanceStatus.CANCELLED,
      ],
      default: constant.maintenanceStatus.SCHEDULED,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    completionDate: Date,
    startDate: Date,
    duration: {
      type: Number, // Duration in hours
    },
    cost: {
      estimated: {
        type: Number,
        min: 0,
      },
      actual: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        default: "USD",
        uppercase: true,
      },
    },
    assignedTo: {
      company: String,
      engineer: String,
      team: String,
    },
    checklist: [
      {
        task: String,
        completed: { type: Boolean, default: false },
        completedAt: Date,
        verifiedBy: String,
      },
    ],
    partsReplaced: [
      {
        partName: String,
        partNumber: String,
        serialNumber: String,
        cost: Number,
      },
    ],
    notes: String,
    attachments: [
      {
        url: String,
        publicId: String,
        type: String, // 'invoice', 'report', 'certificate'
        uploadedAt: { type: Date, default: Date.now },
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: Date,
  },
  { timestamps: true },
);

module.exports = mongoose.model("Maintenance", maintenanceSchema);
