const airlineModel = require("./airline.model");
const otpModel = require("./otp.model");
const tokenModel = require("./token-model");
const user = require("./user-model");

module.exports = {
  User: user,
  Token: tokenModel,
  OTP: otpModel,
  Airline: airlineModel
};
