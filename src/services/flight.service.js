const {flightRepository} = require('../repositories/index');

class FlightService {
    async createFlight(flightData) {
        return await flightRepository.createFlight(flightData);
    }
}
module.exports = new FlightService();