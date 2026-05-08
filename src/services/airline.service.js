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

  async deleteAirline(id) {
    try {
      const deleteAirline = AirlineRepository.deleteAirline(id);
      if (!deleteAirline) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "ID Not Found",
        });
      }
      return deleteAirline;
    } catch (error) {
      error;
    }
  }

  async updateStatus(airlineId, status) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      if (!status) {
        throw new Error("Status is required");
      }
      const update = await AirlineRepository.updateAirlineStatus(
        airlineId,
        status,
      );
      if (!update) {
        throw new Error("Airline Not found");
      }
      return update;
    } catch (error) {
      throw error;
    }
  }

  async removeAllianceFromAirline(airlineId) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      const existingAirline = await AirlineRepository.getAirlineById(airlineId);
      if (!existingAirline) {
        throw new Error("Airline not found");
      }
      if (!existingAirline.allianceDetails) {
        throw new Error("NO_ALLIANCE_TO_REMOVE");
      }
      const removedAllianceName =
        existingAirline.allianceDetails?.name || "Unknown";
      const updatedAirline =
        await AirlineRepository.removeFromAlliance(airlineId);
      return updatedAirline;
    } catch (error) {
      throw error;
    }
  }

  async addAllianceToAirline(airlineId, allianceId) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      if (!allianceId) {
        throw new Error("Alliance ID is required");
      }

      const updatedAirline = await AirlineRepository.addAllaiance(airlineId, allianceId);
      return updatedAirline;
    } catch (error) {
      throw error;
    }
  }

  async searchAirlines(query) {
    if(!query || query.trim() === "") {
      throw new Error("Search query cannot be empty");
    }
    const result = await AirlineRepository.searchAirlines(query);
    if(result.length === 0) {
      throw new Error("No airlines found matching the search criteria");
    }
    return result;
  }
}
module.exports = new AirlineService();
