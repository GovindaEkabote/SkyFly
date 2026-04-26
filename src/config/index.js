const serverConfig = require("./server-config");
 const loggerConfig = require("./logger-config")
const connectDB = require("./db-config");
const { cloudinary } = require("./cloudinary.config"); 
const { limiter } = require("./rate-limiter");

module.exports ={
  serverConfig,
  loggerConfig,
  connectDB,
  cloudinary,
  limiter
}