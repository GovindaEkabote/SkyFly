// middlewares/index.js
const { verifyToken, authorizeRoles } = require("./authJwt");
const {
  userProfileStorage,
  airlineLogoStorage,
  airlineBannerStorage,
  airportLogoStorage,
  aircraftImageStorage,
  userDocumentsStorage,
} = require("./upload");
const {
  uploadUserProfile,
  uploadAirlineLogo,
  uploadAirlineBanner,
  uploadAirportLogo,
  uploadAircraftImage,
  uploadUserDocuments,
  singleUploadDocument,
} = require("./upload.middleware");
const {
  validateUserRequestBody,
  validateUserStatusAndUserType,
} = require("./validateUserRequestBody");

module.exports = {
  validationUser: validateUserRequestBody,
  validateUserStatus: validateUserStatusAndUserType,
  token: verifyToken,
  roleBasedAuth: authorizeRoles,
  userProfileStorage: userProfileStorage,
  userDocumentsStorage: userDocumentsStorage,
  airlineLogoStorage: airlineLogoStorage,
  airlineBannerStorage: airlineBannerStorage,
  airportLogoStorage: airportLogoStorage,
  aircraftImageStorage: aircraftImageStorage,
  uploadUserProfile: uploadUserProfile,
  uploadUserDocuments: uploadUserDocuments,
  uploadAirlineLogo: uploadAirlineLogo,
  uploadAirlineBanner: uploadAirlineBanner,
  uploadAirportLogo: uploadAirportLogo,
  uploadAircraftImage: uploadAircraftImage,
  singleUploadDocument: singleUploadDocument,
};
