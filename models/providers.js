const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance from the db.js file

const Provider = sequelize.define("Provider", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Add any other fields related to the provider
});

module.exports = Provider;
