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
  uploadDocument
};
