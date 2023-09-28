// Import the Provider model
const Provider = require("../models/providers");

// Controller function to create a new provider
exports.createProviders = async (req, res) => {
  try {
    // Extract 'name' from the request body
    const { name } = req.body;

    // Check if 'name' is provided; it is required to create a provider
    if (!name) {
      return res
        .status(400)
        .json({ error: "Name is required to create a provider" });
    }

    // Create a new provider with the provided 'name'
    const provider = await Provider.create({ name });

    // Return a success response with the created provider data
    res.status(201).json({
      message: "Provider created successfully",
      data: provider,
    });
  } catch (error) {
    // Handle any errors that occur during the provider creation process
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating provider" });
  }
};

// Controller function to retrieve all providers
exports.getProviders = async (req, res) => {
  try {
    // Find all providers in the database
    const providers = await Provider.findAll();

    // If no providers are found, return a 404 error
    if (!providers || providers.length === 0) {
      return res.status(404).json({ error: "No providers found" });
    }

    // Return a success response with the fetched provider data
    res.status(200).json({
      message: "Providers retrieved successfully",
      data: providers,
    });
  } catch (error) {
    // Handle any errors that occur during the retrieval process
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving providers" });
  }
};
