const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance from the db.js file
const Provider = require("./providers"); // Import the Provider model

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

// Associate Booking with Provider
Booking.belongsTo(Provider, {
  foreignKey: "provider_id",
  onDelete: "CASCADE",
});

module.exports = Booking;
