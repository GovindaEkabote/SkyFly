const mongoose = require("mongoose");
const logger = require("./logger-config");
const serverConfig = require("./server-config");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(serverConfig.MONGO_URI);

    logger.info(`✅ MongoDB Connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    logger.error(`❌ Database connection error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;