const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Provider = require("./providers"); // Import the Provider model

const BusRoute = sequelize.define("BusRoute", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  source_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  destination_city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_of_journey: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  departure_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  arrival_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  fare: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: false,
  },
  seats_available: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Associate BusRoute with Provider
BusRoute.belongsTo(Provider, {
  foreignKey: "provider_id",
  onDelete: "CASCADE",
});

module.exports = BusRoute;
