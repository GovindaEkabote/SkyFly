const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { serverConfig } = require("../config");

const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: "No access token provided. Please login",
      });
    }

    const decoded = jwt.verify(token, serverConfig.SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

// Role Based Auth..
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userRole = req.user.role || req.user.userType || req.user.Role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Your role is '${userRole}', but this API requires one of: ${allowedRoles.join(", ")}`,
      });
    }

    next();
  };
};

module.exports = { verifyToken, authorizeRoles };
