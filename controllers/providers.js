const Provider = require("../models/providers");

// Create a new provider
exports.createProviders = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ error: "Name is required to create a provider" });
    }

    const provider = await Provider.create({ name });

    res.status(201).json({
      message: "Provider created successfully",
      data: provider,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating provider" });
  }
};

// Get providers
exports.getProviders = async (req, res) => {
  try {
    const providers = await Provider.findAll();

    if (!providers || providers.length === 0) {
      return res.status(404).json({ error: "No providers found" });
    }

    res.status(200).json({
      message: "Providers retrieved successfully",
      data: providers,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving providers" });
  }
};
