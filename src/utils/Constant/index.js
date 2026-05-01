// utils/constants.js
module.exports = {
  // User roles
  userRoles: {
    user: "USER",
    airline_admin: "AIRLINE_ADMIN",
    super_admin: "SUPER_ADMIN",
    staff: "STAFF",
    pilot: "PILOT",
    AirHostess: "AIRHOSTESS",
  },

  // Loyalty tiers
  loyaltyTiers: {
    bronze: "BRONZE",
    silver: "SILVER",
    gold: "GOLD",
    platinum: "PLATINUM",
  },

  // User statuses
  userStatuses: {
    pending: "PENDING",
    approved: "APPROVED",
    blocked: "BLOCKED",
    suspended: "SUSPENDED",
  },
  Gender: {
    female: "FEMALE",
    male: "MALE",
    other: "OTHER",
  },
  bloodGroup: {
    a: "A+",
    a_Negative: "A-",
    b: "B+",
    b_Negative: "B-",
    o: "O+",
    o_Negative: "O-",
    ab: "AB+",
    ab_Negative: "AB-",
  },
  empType: {
    full_time: "FULL_TIME",
    part_time: "PART_TIME",
    contract: "CONTRACT",
  },
  licenseType: {
    SPL: "STUDENT PILOT LICENSE",
    PPL: "PRIVATE PILOT LICENSE",
    CPL: "COMMERCIAL PILOT LICENSE",
    ATPL: "AIRLINE TRANSPORT PILOT LICENSE",
  },
  pilotStatus: {
    active: "ACTIVE",
    inactive: "INACTIVE",
    suspended: "SUSPENDED",
  },
  purpose: {
    register: "REGISTER",
    forgotPassword: "FORGOT_PASSWORD",
    changeEmail: "CHANGE_EMAIL",
  },
  emailStatus: {
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    WARNING: "WARNING",
  },
  emailStatusMessage: {
    SUCCESS: "SUCCESS",
    PENDING: "PENDING",
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    ACCOUNT_LOCKED: "ACCOUNT_LOCKED",
    INVALID_CREDENTIALS: "INVALID_CREDENTIALS",
    INCREMENT_LOGIN_ATTEMPTS: "INCREMENT_LOGIN_ATTEMPTS",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    UNKNOWN_ERROR: "UNKNOWN_ERROR",
    UNAUTHORIZED: "UNAUTHORIZED",
    USER_ALREADY_EXISTS: "USER_ALREADY_EXISTS",
    USER_NOT_FOUND: "USER_NOT_FOUND",
  },
  DOCUMENT_TYPES: {
    password: "PASSWORD",
    IdCard: "ID_CARD",
    license: "LICENSE",
    certificate: "CERTIFICATE",
    education: "EDUCATION",
    exprienceLetter: "EXPRIENCE_LETTER",
    other: "OTHER",
  },
  airlineStatues: {
    activeAirline: "ACTIVE",
    inactiveAirline: "INACTIVE",
    suspendedAirline: "SUSPENDED",
  },
};
