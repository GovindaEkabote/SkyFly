const express = require("express");
const authRoutes = require('./v1/index')
const userRoutes = require('./v1/user.router')
const allianceRoutes = require('./v1/alliance.router')
const router = express.Router();

router.use("/v1", authRoutes);
router.use("/v1", userRoutes);
router.use("/v1", allianceRoutes);


module.exports = router;