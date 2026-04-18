const { constant, userStatuses } = require("../utils");
const userService = require("../services");
const { StatusCodes } = require("http-status-codes");

const updateEmployeeDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updateEmployeeDetails(
      userId,
      req.body.employeeDetails,
    );

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Employee details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePilotDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updatePilotDetails(
      userId,
      req.body.pilotDetails,
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Employee details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updatePersonalDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await userService.updatePersonalDetails(
      userId,
      req.body.personalDetails,
    );
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Employee details updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updateRole = async (req, res) => {
  try {
    const userId = req.params.id;
    const { role } = req.body;

    const updatedUser = await userService.updateRole(userId, role);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Role updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const userId = req.params.id;
    const { userStatus } = req.body;

    if (!userStatus) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "userStatus is required",
      });
    }

    const updatedUser = await userService.updateUserStatus(userId, userStatus);

    return res.status(StatusCodes.ACCEPTED).json({
      success: true,
      message: "Status Updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(StatusCodes.OK).json({
      total: users.length,
      users,
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUserById(req.params.id);
    res.status(StatusCodes.OK).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(StatusCodes.NOT_FOUND).json({ message: error.message });
  }
};

const updateCustomerProfile = async (req, res) => {
  try {
    const userID = req.user.id;

    const updatedProfile = await userService.updatecustomerProfile(
      userID,
      req.body
    );

    if (!updatedProfile) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  updateEmployeeDetails,
  updatePilotDetails,
  updatePersonalDetails,
  updateRole,
  getUser,
  getUsers,
  deleteUser,
  updateStatus,
  updateCustomerProfile
};

// Auth -> 1. email and phone verification..
      //   2.  forgat password email verification
      //   3. change phone number verification 
