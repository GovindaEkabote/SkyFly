const mongoose = require("mongoose");
const { bloodGroup, gender } = require("../../utils");

const personalDetailsSchema = new mongoose.Schema(
  {
    // dateOfBirth: Date,
    // bloodGroup: String,
    // city: String,
    // state: String,
    // country: String,
    dateOfBirth: {
      type: Date,
    },

    gender: {
      type: String,
      enum:[
        gender.female,
        gender.male,
        gender.other
      ]
    },

    bloodGroup: {
      type: String,
      enum:[
        bloodGroup.a,
        bloodGroup.a_Negative,
        bloodGroup.b,
        bloodGroup.b_Negative,
        bloodGroup.o,
        bloodGroup.o_Negative,
        bloodGroup.a,
        bloodGroup.ab_Negative,
      ]
    },

    phoneAlternate: {
      type: String,
    },

    addressLine1: {
      type: String,
    },

    addressLine2: {
      type: String,
    },

    city: {
      type: String,
    },

    state: {
      type: String,
    },

    country: {
      type: String,
    },

    pincode: {
      type: String,
    },

    nationality: {
      type: String,
    },

    emergencyContactName: {
      type: String,
    },

    emergencyContactNumber: {
      type: String,
    },
  },
  { _id: false },
);

module.exports = personalDetailsSchema;
