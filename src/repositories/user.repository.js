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



module.exports = {
  updateUserById,
  getUserById,
  getUsers,
  deleteUserById,
};
