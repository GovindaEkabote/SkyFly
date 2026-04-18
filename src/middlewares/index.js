const { verifyToken, authorizeRoles } = require("./authJwt");
const {
  validateUserRequestBody,
  validateUserStatusAndUserType,
} = require("./validateUserRequestBody");

module.exports = {
  validationUser: validateUserRequestBody,
  validateUserStatus: validateUserStatusAndUserType,
  token: verifyToken,
  roleBasedAuth: authorizeRoles,
};
