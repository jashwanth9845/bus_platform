const express = require("express");
const sequelize = require("./config/db");
const routes = require("./routes/route");

const app = express();
const PORT = process.env.APP_PORT || 5000;

// Middleware for parsing JSON data
app.use(express.json());

// Use the API routes defined in route.js
app.use("/api", routes);

// Start the server
sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
