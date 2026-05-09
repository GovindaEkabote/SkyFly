const airlineRepository = require("./airline.repository");
const AirportRepository = require("./airport.repository");
const AllianceRepository = require("./alliance.repository");
const {
  updateUserById,
  getUserById,
  getUsers,
  deleteUserById,
  addDocuments,
  getAllDocuments,
  saveUser,
  getUserByIdWithDocuments,
  verifyUserDocument
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
  AirportRepository
};
