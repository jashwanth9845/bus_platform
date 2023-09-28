const BusRoute = require("../models/bus_route");
const sequelize = require("../config/db");

// Create a new bus route
exports.createBusRoute = async (req, res) => {
  try {
    const {
      provider_id,
      source_city,
      destination_city,
      date_of_journey,
      departure_time,
      arrival_time,
      fare,
      seats_available,
    } = req.body;

    // Check if a route with the same source, destination, and date already exists for the same provider
    const existingRoute = await BusRoute.findOne({
      where: {
        source_city,
        destination_city,
        date_of_journey,
        provider_id, // Add provider_id to the search criteria
      },
    });

    if (existingRoute) {
      return res.status(400).json({
        error:
          "Route with the same source, destination, date, and provider already exists",
      });
    }

    // Add the provider_id to the bus route before creating it
    const busRoute = await BusRoute.create({
      source_city,
      destination_city,
      date_of_journey,
      departure_time,
      arrival_time,
      fare,
      seats_available,
      provider_id, // Include provider_id in the bus route
    });

    res
      .status(201)
      .json({ message: "Successfully created bus route", data: busRoute });
  } catch (error) {
    res.status(500).json({ error: "Error creating bus route" });
  }
};

// Get bus routes based on parameters
exports.getBusRoutes = async (req, res) => {
  try {
    const { source_city, destination_city, date_of_journey } = req.query;

    let condition = {};

    if (source_city && destination_city) {
      condition = {
        source_city,
        destination_city,
      };
    } else {
      return res.status(400).json({
        error: "Source_city and destination_city are mandatory parameters",
      });
    }

    // If date_of_journey is provided, add it to the condition
    if (date_of_journey) {
      condition.date_of_journey = sequelize.literal(
        `DATE(date_of_journey) = '${date_of_journey}'`
      );
    }

    const busRoutes = await BusRoute.findAll({
      where: condition,
    });

    if (busRoutes.length === 0) {
      return res
        .status(404)
        .json({ error: "No bus routes found with the provided criteria" });
    }

    res
      .status(200)
      .json({ message: "Successfully fetched bus routes", data: busRoutes });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving bus routes" });
  }
};
