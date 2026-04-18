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
};
