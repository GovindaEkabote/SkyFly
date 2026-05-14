const airlineModel = require("./airline.model");
const airportModel = require("./airport.model");
const maintenanceModel = require("./maintenance.model");
const otpModel = require("./otp.model");
const tokenModel = require("./token-model");
const user = require("./user-model");
const aircraftModel = require("./aircraft.model");

module.exports = {
  User: user,
  Token: tokenModel,
  OTP: otpModel,
  Airline: airlineModel,
  Airport: airportModel,
  Maintenance: maintenanceModel,
  Aircraft: aircraftModel,
};
