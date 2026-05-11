const { StatusCodes } = require("http-status-codes");
const AirlineRepository = require("../repositories/airline.repository");
const { AllianceRepository } = require("../repositories/index");
const { AirportRepository } = require("../repositories/index");

class Airport {
  async createAirport(data) {
    try {
      const { code, name, city, country, coordinates, terminals } = data;

      if (!code || !name || !city || !country || !coordinates || !terminals) {
        throw new Error("All fields must be provided");
      }

      const existCode = await AirportRepository.codeExist(code);

      if (existCode) {
        throw new Error("Code already exists");
      }

      const airport = await AirportRepository.createAirport(data);

      return airport;
    } catch (error) {
      throw error;
    }
  }

  async getAirportById(id) {
    try {
      const airport = await AirportRepository.getAirportById(id);
      if (!airport) {
        throw new Error("Airport not found");
      }
      return airport;
    } catch (error) {
      throw error;
    }
  }
  async getAirports(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const airports = await AirportRepository.getAirports(skip, limit);
      return airports;
    } catch (error) {
      throw error;
    }
  }

  async updateAirportById(id, data) {
    try {
      const updatedAirport = await AirportRepository.updateAirport(id, data);
      if (!updatedAirport) {
        throw new Error("Airport not found");
      }
      return updatedAirport;
    } catch (error) {
      throw error;
    }
  }

  async deleteAirportById(id) {
    try {
      const deletedAirport = await AirportRepository.deleteAirport(id);
      if (!deletedAirport) {
        throw new Error("Airport not found");
      }
      return deletedAirport;
    } catch (error) {
      throw error;
    }
  }

  async updateAirportStatus(id, status) {
    try {
      const updatedAirport = await AirportRepository.updateAirportStatus(
        id,
        status,
      );
      if (!updatedAirport) {
        throw new Error("Airport not found");
      }
      return updatedAirport;
    } catch (error) {
      throw error;
    }
  }

  async findAirportByStatus(status) {
    try {
      const airports = await AirportRepository.findAirportByStatus(status);
      if (airports.length === 0) {
        throw new Error("No airports found with the given status");
      }
      return airports;
    } catch (error) {
      throw error;
    }
  }

  async findAirportByCode(code) {
    try {
      const airports = await AirportRepository.findAirportByCode(code);
      if (airports.length === 0) {
        throw new Error("No airports found with the given code");
      }
      return airports;
    } catch (error) {
      throw error;
    }
  }

  async searchAirports(query) {
    try {
      const airports = await AirportRepository.searchAirports(query);
      if (airports.length === 0) {
        throw new Error("No airports found matching the search query");
      }
      return airports;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Airport();
