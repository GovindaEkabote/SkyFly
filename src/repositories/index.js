const aircraftRepository = require("./aircraft.repository");
const airlineRepository = require("./airline.repository");
const AirportRepository = require("./airport.repository");
const AllianceRepository = require("./alliance.repository");
const maintenanceRepository = require("./maintenance.repository");
const flightRepository = require("./flight.repository");
const {
  updateUserById,
  getUserById,
  getUsers,
  deleteUserById,
  addDocuments,
  getAllDocuments,
  saveUser,
  getUserByIdWithDocuments,
  verifyUserDocument,
} = require("./user.repository");

module.exports = {
  updateUserById,
  getUserById,
  getUsers,
  deleteUserById,
  addDocuments,
  getAllDocuments,
  saveUser,
  getUserByIdWithDocuments,
  verifyUserDocument,
  AllianceRepository,
  airlineRepository,
  AirportRepository,
  maintenanceRepository,
  aircraftRepository,
  flightRepository,
};
