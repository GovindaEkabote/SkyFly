const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  PORT: process.env.PORT, // fallback added
  MONGO_URI: process.env.MONGO_URI,
  SECRET: process.env.SECRET,
  EXPIRES_IN: process.env.EXPIRES_IN,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  REFRESH_EXPIRES_IN: process.env.REFRESH_EXPIRES_IN,

};
