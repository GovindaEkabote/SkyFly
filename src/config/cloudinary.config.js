const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const serverConfig = require("./server-config");

cloudinary.config({
  cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME,
  api_key: serverConfig.CLOUDINARY_API_KEY,
  api_secret: serverConfig.CLOUDINARY_API_SECRET,
});

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
  console.error("❌ Cloudinary credentials missing in .env file");
  console.error("Please add: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET");
} else {
  console.log("✅ Cloudinary configured successfully");
}

module.exports = {
  cloudinary,
  CloudinaryStorage
};
