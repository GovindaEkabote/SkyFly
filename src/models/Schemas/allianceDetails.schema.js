const mongoose = require("mongoose");
const { airlineStatus } = require("../../utils");

const allianceSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true
    },

    name: {
      type: String,
      required: true,
      trim: true
    },

    description: String,

    foundedYear: Number,

    headquartersCountry: String,

    logo: {
      url: String,
      publicId: String
    },

    status: {
      type: String,
      enum: [airlineStatus.activeAirline, airlineStatus.inactiveAirline],
      default: airlineStatus.activeAirline,
      index: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Alliance", allianceSchema);