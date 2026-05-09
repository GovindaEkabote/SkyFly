const express = require("express");
const authRoutes = require('./v1/index')
const userRoutes = require('./v1/user.router')
const allianceRoutes = require('./v1/alliance.router')
const airlineRoutes = require('./v1/airline.router')
const airportRoutes = require('./v1/airport.router')
const router = express.Router();

router.use("/v1", authRoutes);
router.use("/v1", userRoutes);
router.use("/v1", allianceRoutes);
router.use("/v1", airlineRoutes)
router.use("/v1", airportRoutes);


module.exports = router;