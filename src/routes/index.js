const express = require("express");
const authRoutes = require('./v1/index')
const userRoutes = require('./v1/user.router')
const router = express.Router();

router.use("/v1", authRoutes);
router.use("/v1", userRoutes);


module.exports = router;