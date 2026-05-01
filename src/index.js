const express = require("express");
var cookieParser = require('cookie-parser')
const { serverConfig, connectDB, limiter } = require("./config");
const apiRoutes = require("./routes/index.js");
const logger = require("./config/logger-config.js");
const app = express();
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use(cookieParser())
app.use("/api", apiRoutes);

app.use(limiter)

// ✅ Start server ONLY after DB connection
const startServer = async () => {
  try {
    await connectDB();

    app.listen(serverConfig.PORT, () => {
      logger.info(`🚀 Server started on port ${serverConfig.PORT}`);
    });
  } catch (error) {
    logger.error("❌ Failed to start server");
  }
};

startServer();
app.listen(serverConfig.PORT, () => {
  console.log("Server started on port " + serverConfig.PORT);
});


