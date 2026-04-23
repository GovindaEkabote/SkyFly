// config/storage.config.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const { cloudinary } = require("../config"); // Fix import path

// Check if cloudinary is properly imported
if (!cloudinary || !cloudinary.uploader) {
  console.error("Cloudinary not properly configured");
  throw new Error("Cloudinary configuration failed");
}

// Fixed: Changed 'floder' to 'folder' in all configurations
const userProfileStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/users/profiles", // Fixed typo: floder -> folder
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `user_${req.user?.id || 'anonymous'}_${Date.now()}`,
  },
});

const userDocumentsStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/users/documents", // Fixed typo: floder -> folder
    allowed_formats: ["jpg", "jpeg", "png", "pdf"],
    resource_type: "auto",
    public_id: (req, file) => `user_${req.user?.id || 'anonymous'}_${Date.now()}`,
  },
});

const airlineLogoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/airlines/logos", // Fixed typo: floder -> folder and airlins -> airlines
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `airline_${req.params?.airlineId}_logo`,
  },
});

const airlineBannerStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/airlines/banners",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `airline_${req.params?.airlineId}_banner`,
  },
});

const airportLogoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/airports/logos",
    allowed_formats: ["jpg", "jpeg", "png", "svg", "webp"],
    public_id: (req, file) => `airport_${req.params?.airportId}_logo`,
  },
});

const aircraftImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "skyfly/aircrafts",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    public_id: (req, file) => `aircraft_${req.params?.aircraftId}_${Date.now()}`,
  },
});

module.exports = {
  userProfileStorage,
  userDocumentsStorage,
  airlineLogoStorage,
  airlineBannerStorage,
  airportLogoStorage,
  aircraftImageStorage,
};