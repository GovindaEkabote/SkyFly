const multer = require("multer");
const { userDocumentsStorage } = require(".");
const {
  userProfileStorage,
  airlineLogoStorage,
  airlineBannerStorage,
  airportLogoStorage,
  aircraftImageStorage,
} = require("./upload");

const imageFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const documentFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/jpg",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF, JPEG, and PNG files are allowed!"), false);
  }
};

// Upload middleware for user profile
const uploadUserProfile = multer({
  storage: userProfileStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("profilePicture");

// Upload middleware for user documents (multiple files)
const uploadUserDocuments = multer({
  storage: userDocumentsStorage,
  fileFilter: documentFileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
}).array("documents", 5); // Max 5 documents

// Upload middleware for airline logo
const uploadAirlineLogo = multer({
  storage: airlineLogoStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
}).single("logo");

// Upload middleware for airline banner
const uploadAirlineBanner = multer({
  storage: airlineBannerStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("banner");

// Upload middleware for airport logo
const uploadAirportLogo = multer({
  storage: airportLogoStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
}).single("logo");

// Upload middleware for aircraft image
const uploadAircraftImage = multer({
  storage: aircraftImageStorage,
  fileFilter: imageFileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("image");

module.exports = {
  uploadUserProfile,
  uploadUserDocuments,
  uploadAirlineLogo,
  uploadAirlineBanner,
  uploadAirportLogo,
  uploadAircraftImage,
};
