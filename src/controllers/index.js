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
  getUserDocument
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
  getUserDocument
};
