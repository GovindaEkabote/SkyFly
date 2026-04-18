// utils/constants.js
module.exports = {
  // User roles
  userRoles: {
    user: "USER",
    airline_admin: "AIRLINE_ADMIN",
    super_admin: "SUPER_ADMIN",
    staff: "STAFF",
    pilot: "PILOT",
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
};
