const express = require("express");
const router = express.Router();
const {
  updatePersonalDetails,
  updateEmployeeDetails,
  updatePilotDetails,
  updateRole,
  getUser,
  getUsers,
  deleteUser,
  updateStatus,
  updateCustomerProfile,
  uploadUserProfilePicture,
  uploadMultipleDocuments
} = require("../../controllers");
const { constant } = require("../../utils");
const {
  validationUser,
  validateUserStatus,
  token,
  roleBasedAuth,
  uploadUserProfile,
  uploadUserDocuments
} = require("../../middlewares");

router.patch(
  "/user/:id/employee",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updatePersonalDetails,
);

router.patch(
  "/emp/:id/details",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updateEmployeeDetails,
);

router.patch(
  "/pilot/:id/details",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updatePilotDetails,
);
router.patch(
  "/update/role/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updatePilotDetails,
);

router.put(
  "/update/role/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updateRole,
);

router.get(
  "/get/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  getUser,
);

router.get(
  "/users",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  getUsers,
);

router.delete(
  "/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  deleteUser,
);

router.put(
  "/update/status/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  updateStatus,
);

router.put(
  "/update/customer/profile",
  token,
  roleBasedAuth(constant.user),
  updateCustomerProfile,
);

router.post(
  "/user/profile-picture",
  token,
  uploadUserProfile,
  uploadUserProfilePicture,
);


router.post(
  "/user/document",
  token,
  uploadUserDocuments,
  uploadMultipleDocuments,
);

module.exports = router;
