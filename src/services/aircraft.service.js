const { StatusCodes } = require("http-status-codes");
const { aircraftRepository } = require("../repositories/index");

class AircraftService {
  async createAircraft(data) {
    try {
        const existingAircraft = await aircraftRepository.findAircraftByRegistration(data.registration);
        if (existingAircraft) {
          throw {
            status: StatusCodes.CONFLICT,
            message: "Aircraft with this registration already exists",
          };
        }
        return await aircraftRepository.createAircraft(data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AircraftService();
