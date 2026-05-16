const { Flight } = require('../models/index');

class FlightRepository {
    async createFlight(flightData) {
        return await Flight.create(flightData); // ✅ works now
    }
}

module.exports = new FlightRepository();