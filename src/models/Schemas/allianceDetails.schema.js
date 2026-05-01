  const mongoose = require("mongoose");
  const { airlineStatues } = require("../../utils");

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
        enum: [airlineStatues.activeAirline, airlineStatues.inactiveAirline, airlineStatues.suspendedAirline],
        default: airlineStatues.activeAirline,
        index: true
      }
    },
    { timestamps: true }
  );

  module.exports = mongoose.model("Alliance", allianceSchema);