// utils/index.js
const constants = require("./Constant/index");
const transporter = require("./emailService");
const generateOtp = require("./otp");

module.exports = {
  constant: constants.userRoles,
  loyaltyTiers: constants.loyaltyTiers,
  userStatuses: constants.userStatuses,
  gender: constants.Gender,
  bloodGroup: constants.bloodGroup,
  empType: constants.empType,
  licenseType: constants.licenseType,
  pilotStatus: constants.pilotStatus,
  purpose: constants.purpose,
  documents: constants.documents,
  transporter: transporter,
  generateOtp: generateOtp,
  DOCUMENT_TYPES  : constants.DOCUMENT_TYPES,
  airlineStatues : constants.airlineStatues
};
