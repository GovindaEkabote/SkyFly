const userRepository = require("../repositories");
const { constant } = require("../utils");

const updateEmployeeDetails = async (userId, employeeDetails) => {
  const updatePayload = {
    employeeDetails,
  };
  return await userRepository.updateUserById(userId, updatePayload);
};

const updatePilotDetails = async (userId, pilotDetails) => {
  const updatePayload = {
    pilotDetails,
  };
  return await userRepository.updateUserById(userId, updatePayload);
};

const updatePersonalDetails = async (userId, personalDetails) => {
  const updatePayload = {};

  Object.keys(personalDetails).forEach((key) => {
    updatePayload[`personalDetails.${key}`] = personalDetails[key];
  });

  return await userRepository.updateUserById(userId, updatePayload);
};

const updateRole = async (userID, role) => {
  return await userRepository.updateUserById(userID, { role });
};

const updateUserStatus = async (userId, userStatus) => {
  return await userRepository.updateUserById(userId, { userStatus });
};

const updatecustomerProfile = async (userId, data) => {
  const allowedFields = ["firstName", "lastName", "email", "phoneNumber"];

  const filteredData = {};

  for (let key of allowedFields) {
    if (data[key] !== undefined) {
      filteredData[key] = data[key];
    }
  }
  if (Object.keys(filteredData).length === 0) {
    throw new Error("No valid fields provided for update");
  }

  return await userRepository.updateUserById(userId, filteredData);
};

const getUserById = async (userId) => {
  const user = await userRepository.getUserById(userId);
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

const getUsers = async () => {
  const users = await userRepository.getUsers();

  if (!users || users.length === 0) {
    throw new Error("No users found");
  }
  return users;
};

const deleteUserById = async (userId) => {
  const user = await userRepository.deleteUserById(userId);

  if (!user || user.length === 0) {
    throw new Error("No users found");
  }
  return user;
};

const uodateUserById = async (userId, data) => {
  return await userRepository.updateUserById(userId, data);
};

const updateProfilePicture = async (userId, profilePictureData) => {
  return await userRepository.updateUserById(userId, {
    profilePicture: profilePictureData,
  });
};

module.exports = {
  updateEmployeeDetails,
  updatePilotDetails,
  updatePersonalDetails,
  updateRole,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserStatus,
  updatecustomerProfile,
  uodateUserById, 
  updateProfilePicture,
};
