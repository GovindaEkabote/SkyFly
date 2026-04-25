const { constant, userStatuses, DOCUMENT_TYPES } = require("../utils");
const userService = require("../services");
const { StatusCodes } = require("http-status-codes");
const { cloudinary_js_config, cloudinary } = require("../config");

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
      req.body,
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

const uploadUserProfilePicture = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "No file uploaded" });
    }
    const user = await userService.getUserById(req.user.id);
    userService.uodateUserById;

    if (user.profilePicture && user.profilePicture.publichId) {
      await cloudinary_js_config.uploader.destroy(
        user.profilePicture.publichId,
      );
    }
    // Update user with new profile picture
    const updatedUser = await userService.uodateUserById(
      req.user.id,
      {
        profilePicture: {
          url: req.file.path,
          publicId: req.file.filename,
          cloudinaryUrl: req.file.path,
        },
      },
      { new: true },
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Profile picture uploaded successfully",
      data: { profilePicture: updatedUser.profilePicture },
    });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const uploadMultipleDocuments = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No files uploaded",
      });
    }

    console.log("Complete file object:", JSON.stringify(req.files[0], null, 2));
    console.log("All available keys:", Object.keys(req.files[0]));

    const { documentType } = req.body;

    let types = [];

    if (typeof documentType === "string") {
      try {
        types = JSON.parse(documentType);
      } catch (err) {
        types = [documentType];
      }
    } else if (Array.isArray(documentType)) {
      types = documentType;
    }

    const validDocumentTypes = Object.values(DOCUMENT_TYPES);

    if (types.length > 0 && types.length !== req.files.length) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: `Document types (${types.length}) must match files (${req.files.length})`,
      });
    }

    const uploadedDocuments = [];
    const errors = [];

    for (let i = 0; i < req.files.length; i++) {
      const file = req.files[i];
      const type = types[i] || DOCUMENT_TYPES.OTHER;

      if (!validDocumentTypes.includes(type)) {
        errors.push(`Invalid type for file ${i + 1}: ${type}`);
        continue;
      }

      // ✅ CORRECT WAY TO GET CLOUDINARY URL AND PUBLIC ID
      // multer-storage-cloudinary adds these properties to the file object:
      const documentUrl = file.path || file.secure_url || file.url;
      const documentPublicId = file.filename || file.public_id;
      
      // Alternative: If the above doesn't work, try:
      // const documentUrl = file.path; // This should work
      // const documentPublicId = file.filename; // This should work

      // Debug logging to see what's available
      console.log("File object structure:", {
        path: file.path,
        filename: file.filename,
        secure_url: file.secure_url,
        public_id: file.public_id,
        url: file.url,
        originalname: file.originalname,
        mimetype: file.mimetype
      });

      if (!documentUrl) {
        errors.push(`Cloudinary URL not available for file ${i + 1}`);
        continue;
      }

      const documentData = {
        type,
        url: documentUrl,
        publicId: documentPublicId,
        uploadedAt: new Date(),
        verified: false,
      };

      try {
        const updatedUser = await userService.addUserDocument(
          req.user.id,
          documentData
        );

        const savedDocument = updatedUser.documents?.[updatedUser.documents.length - 1];

        uploadedDocuments.push(savedDocument);
      } catch (err) {
        errors.push(`Upload failed for file ${i + 1}: ${err.message}`);

        // Rollback cloudinary file if upload fails
        if (documentPublicId) {
          await cloudinary.uploader.destroy(documentPublicId).catch(console.error);
        }
      }
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: `${uploadedDocuments.length} documents uploaded`,
      data: {
        documents: uploadedDocuments,
        errors: errors.length ? errors : undefined,
      },
    });
  } catch (error) {
    console.error("Multiple upload error:", error);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Failed to upload documents",
      error: error.message,
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
  updateCustomerProfile,
  uploadUserProfilePicture,
  uploadMultipleDocuments,
};

// Auth -> 1. email and phone verification..
//   2.  forgat password email verification
//   3. change phone number verification
