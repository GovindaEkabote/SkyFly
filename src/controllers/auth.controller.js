const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { constant, userStatuses, generateOtp } = require("../utils");
const { User, Token, OTP } = require("../models");
const { serverConfig } = require("../config");
const { sendOtpEmail } = require("../services");
const { purpose } = require("../utils/Constant");

const signUp = async (req, res) => {
  try {
    const { email,otp, password, firstName, lastName, phoneNumber, role } =
      req.body;

    const record = await OTP.findOne({
      email,
      otp,
      purpose: "REGISTER",
    });

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    if (record.expiresAt < new Date()) {
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // hash password
    const hashPassword = await bcrypt.hash(password, 10);

    const finalUserRole = role || constant.user;
    const status =
      finalUserRole === constant.user
        ? userStatuses.approved
        : userStatuses.pending;

    // hash Password
    // const hashPassword = await bcrypt.hash(password, 10);

    // Create New User
    const newUser = await User.create({
      email,
      password: hashPassword,
      firstName,
      lastName,
      phoneNumber,
      role: finalUserRole,
      userStatus: status,
      emailVerified: true,
    });
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "User Create Successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error while creating user:", error);
    // Handle duplicate key error (MongoDB unique constraint)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(409).json({
        success: false,
        message: `User with this ${duplicateField} already exists.`,
      });
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error while creating the user",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Both email and password are required.",
      });
    }

    // find the Email is exist in database or not..
    const user = await User.findOne({ email }).select("+password");
    if (!user.emailVerified) {
      return res.status(403).json({
        success: false,
        message: "Please verify your email first",
      });
    }
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: `User with email '${email}' not found.`,
      });
    }
    // check approval status
    if (user.userStatus !== userStatuses.approved) {
      return res.status(StatusCodes.FORBIDDEN).json({
        success: false,
        message: `Access denied. User status is '${user.userStatus}'.`,
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: "Invalid password.",
      });
    }
    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || user.userType || user.Role,
      },
      serverConfig.SECRET,
      { expiresIn: serverConfig.EXPIRES_IN },
    );

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role || user.userType || user.Role,
      },
      serverConfig.REFRESH_SECRET,
      { expiresIn: serverConfig.REFRESH_EXPIRES_IN },
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await Token.create({ userId: user._id, refreshToken, expiresAt });

    // Set cookies (httpOnly, secure, sameSite)
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Login successful.",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.Role,
        userStatus: user.userStatus,
      },
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error during login.",
    });
  }
};

const logout = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "No refersh token found",
      });
    }
    res.clearCookie("accessToken", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: "strict",
      path: "/",
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Logout successful. Tokens cleared.",
    });
    await Token.findByIdAndDelete({ refreshToken });
  } catch (error) {
    console.error("Error during logout:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Internal server error during logout.",
    });
  }
};

const sendRegisterOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // check if already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "User already exists",
      });
    }

    const otp = generateOtp();

    await OTP.deleteMany({
      email,
      purpose: purpose.register,
    });

    await OTP.create({
      email,
      otp,
      purpose: "REGISTER",
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendOtpEmail(email, otp);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = {
  signUp,
  login,
  logout,
  sendRegisterOtp,
};

// forgot password
// reset Password
