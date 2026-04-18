const mongoose = require("mongoose");
const { constant, empType } = require("../../utils");

const employeeDetailsSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      trim: true,
    },

    jobTitle: {
      type: String,
      required: true,
    },
     department: {
      type: String,
      required: true,
    },
    experienceYears: {
      type: Number,
      min: 0,
      default: 0,
    },
    dateOfJoining: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      min: 0,
      required: true,
    },
    employmentType: {
      type: String,
      enum: [empType.contract, empType.full_time, empType.part_time],
      default: "FULL_TIME",
    },
    previousCompany: {
      type: String,
      trim: true,
    },
    education: {
      type: String,
      trim: true,
    },
  },
  { _id: false },
);

module.exports = employeeDetailsSchema;
