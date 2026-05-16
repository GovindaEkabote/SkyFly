const express = require('express');
const { constant } = require('../../utils');
const { roleBasedAuth, token } = require('../../middlewares');
const router = express.Router();
const { flightController } = require('../../controllers/index');



router.post(
    '/create/flight',
    token,
    roleBasedAuth(constant.airline_admin, constant.super_admin),
    flightController.createFlight,
);

router.get(
    '/get/flight/:id',
    token,
    flightController.getFlightById,
);

router.get(
    '/search/flights',
    token,
    flightController.searchFlights,
);

router.get(
    '/get/all/flights',
    token,
    flightController.getFlights,
);

module.exports = router;