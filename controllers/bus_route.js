const BusRoute = require("../models/bus_route");
const sequelize = require("../config/db");

// Controller function to create a new bus route
exports.createBusRoute = async (req, res) => {
  try {
    // Extract data from the request body
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

    // Check if a route with the same source, destination, date, and provider already exists
    const existingRoute = await BusRoute.findOne({
      where: {
        source_city,
        destination_city,
        date_of_journey,
        provider_id, // Add provider_id to the search criteria
      },
    });

    // If a matching route is found, return a 400 error
    if (existingRoute) {
      return res.status(400).json({
        error:
          "Route with the same source, destination, date, and provider already exists",
      });
    }

    // Create a new bus route with the provided information, including the provider_id
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

    // Return a success response with the created bus route data
    res
      .status(201)
      .json({ message: "Successfully created bus route", data: busRoute });
  } catch (error) {
    // Handle any errors that occur during the route creation process
    res.status(500).json({ error: "Error creating bus route" });
  }
};

// Controller function to retrieve bus routes based on specified criteria
exports.getBusRoutes = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { source_city, destination_city, date_of_journey } = req.query;

    let condition = {};

    // Check if both source_city and destination_city are provided
    if (source_city && destination_city) {
      condition = {
        source_city,
        destination_city,
      };
    } else {
      // Return a 400 error if source_city and destination_city are not provided
      return res.status(400).json({
        error: "Source_city and destination_city are mandatory parameters",
      });
    }

    // If date_of_journey is provided, add it to the condition for filtering
    if (date_of_journey) {
      condition.date_of_journey = sequelize.literal(
        `DATE(date_of_journey) = '${date_of_journey}'`
      );
    }

    // Find all bus routes that match the specified conditions
    const busRoutes = await BusRoute.findAll({
      where: condition,
    });

    // If no matching bus routes are found, return a 404 error
    if (busRoutes.length === 0) {
      return res
        .status(404)
        .json({ error: "No bus routes found with the provided criteria" });
    }

    // Return a success response with the fetched bus route data
    res
      .status(200)
      .json({ message: "Successfully fetched bus routes", data: busRoutes });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving bus routes" });
  }
};
