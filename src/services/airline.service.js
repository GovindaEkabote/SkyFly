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

  async getAirlines(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const airlines = await AirlineRepository.getAirlines(skip, limit);
      const total = await AirlineRepository.countAirlines();
      if (airlines == 0 || airlines.length == 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "No Airlines Found",
        });
      }
      return {
        data: airlines,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getAirlineById(id) {
    try {
      const getId = await AirlineRepository.getAirlineById(id);
      if (!getId) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "ID Not Found",
        });
      }
      return getId;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAirlineById",
        error,
      });
    }
  }

  async updateAirline(airlineId, data) {
    try {
      return await AirlineRepository.updateAirline(airlineId, data);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AirlineService();
