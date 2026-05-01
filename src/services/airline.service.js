const { StatusCodes } = require("http-status-codes");
const AirlineRepository = require("../repositories/airline.repository");
const allianceRepository = require("../repositories/alliance.repository");

class AirlineService {
  async createAirline(data) {
    try {
      const { name, code, allianceDetails, country } = data;
      if (!name || !code || !allianceDetails || !country) {
        throw new Error("All required fields must be provided");
      }
      const existCode = await AirlineRepository.findByCode(code);
      if (existCode) {
        throw new Error("code already exist");
      }
      const existAlliance =
        await allianceRepository.getAllAllianceById(allianceDetails);
      if (!existAlliance) {
        throw new Error("Invalid alliance ID");
      }
      const airline = await AirlineRepository.createAirline(data);
      return airline;
    } catch (error) {
      throw error;
    }
  }

  async getAirlines(skip,limit){
    try {
        //const skip = (page -1) 
    } catch (error) {
        
    }
  }
}

module.exports = new AirlineService();
