const airlineController = require("./airline.controller");
const airportController = require("./airport.controller");
const AllianceController = require("./alliance.controller");
const maintenanceController = require("./maintenance.controller");
const aircraftController = require("./aircraft.controller");
const {
  updateEmployeeDetails,
  updatePilotDetails,
  updatePersonalDetails,
  updateRole,
  getUser,
  getUsers,
  deleteUser,
  updateStatus,
  updateCustomerProfile,
  uploadUserProfilePicture,
  uploadMultipleDocuments,
  uploadDocument,
  getUserDocument,
  deleteDocument,
  verifyDocument,
} = require("./user.controller");

module.exports = {
  authController: require("./auth.controller"),
  updateEmployeeDetails,
  updatePilotDetails,
  updatePersonalDetails,
  updateRole,
  getUser,
  getUsers,
  deleteUser,
  updateStatus,
  updateCustomerProfile,
  uploadUserProfilePicture,
  uploadMultipleDocuments,
  uploadDocument,
  getUserDocument,
  deleteDocument,
  verifyDocument,
  AllianceController,
  airlineController,
  airportController,
  maintenanceController,
  aircraftController

};
