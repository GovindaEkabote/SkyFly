const { sendOtpEmail } = require("./email.service");
const {
  updateEmployeeDetails,
  updatePilotDetails,
  updatePersonalDetails,
  updateRole,
  getUserById,
  getUser,
  getUsers,
  deleteUserById,
  updateUserStatus,
  updatecustomerProfile,
  uodateUserById,
  updateProfilePicture,
  addUserDocument ,
} = require("./user.service");

module.exports = {
  updateEmployeeDetails: updateEmployeeDetails,
  updatePilotDetails: updatePilotDetails,
  updatePersonalDetails: updatePersonalDetails,
  updateRole: updateRole,
  getUserById: getUserById,
  getUser: getUser,
  getUsers: getUsers,
  deleteUserById: deleteUserById,
  updateUserStatus: updateUserStatus,
  updatecustomerProfile: updatecustomerProfile,
  sendOtpEmail: sendOtpEmail,
  uodateUserById: uodateUserById,
  updateProfilePicture: updateProfilePicture,
  addUserDocument: addUserDocument 
};
