const { User } = require("../models");

const updateUserById = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true, runValidators: true },
  );
};

const getUserById = async (userId) => {
  return await User.findById(userId);
};

const getUsers = async () => {
  return await User.find({});
};

const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

// Add multiple document
const addDocuments = async (userId, documents) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  documents.forEach((doc) => {
    user.documents.push({
      type: doc.type,
      url: doc.url, // 🔥 FIX: MUST STORE URL
      publicId: doc.publicId,
      uploadedAt: doc.uploadedAt || new Date(),
      verified: doc.verified || false,
    });
  });

  await user.save();

  return user;
};

const getAllDocuments =  async (userId) => {
  return await User.findById(userId).select("documents");
};

module.exports = {
  updateUserById,
  getUserById,
  getUsers,
  deleteUserById,
  addDocuments,
  getAllDocuments,
};
