const { StatusCodes } = require("http-status-codes");
const userRepository = require("../repositories");
const { constant } = require("../utils");
const { cloudinary } = require("../config");

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
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "user Not Found",
    });
  }
  return user;
};

const getUsers = async () => {
  const users = await userRepository.getUsers();

  if (!users || users.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "user Not Found",
    });
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

const addUserDocument = async (userId, documents) => {
  if (!Array.isArray(documents)) {
    documents = [documents];
  }

  return await userRepository.addDocuments(userId, documents);
};

const getUserDocuments = async (userId) => {
  const user = await userRepository.getAllDocuments(userId);

  if (!user) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "user Not Found",
    });
  }

  if (!user.documents || user.documents.length === 0) {
    return res.status(StatusCodes.NOT_FOUND).json({
      success: false,
      message: "Document Not Found",
    });
  }

  return user.documents;
};

const deleteUserDocument = async (userId, documentId) => {
  const user = await userRepository.getUserByIdWithDocuments(userId);
  if (!user) {
    throw new Error("User not found");
  }

  const document = user.documents.id(documentId);

  if (!document) {
    throw new Error("Document not found");
  }

  // 🔥 Delete from Cloudinary FIRST
  if (document.publicId) {
    await cloudinary.uploader.destroy(document.publicId);
  }

  // Remove from DB
  user.documents.pull(documentId);

  await userRepository.saveUser(user);

  return true;
};

const verifyDocument = async ( documentId, verified) => {
  return await userRepository.verifyUserDocument(
    // userId,
    documentId,
    verified 
  );
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
  addUserDocument,
  getUserDocuments,
  deleteUserDocument,
  verifyDocument
};
