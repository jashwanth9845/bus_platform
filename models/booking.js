const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const BusRoute = require("./bus_route");
const Payment = require("./payment");

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
  is_cancelled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false, // Default value is false (not cancelled)
  },
  cancellation_fee: {
    type: DataTypes.FLOAT,
    defaultValue: 0, // Default value is 0
  },
});

// Associate Booking with BusRoute
Booking.belongsTo(BusRoute, {
  foreignKey: "bus_route_id",
  onDelete: "CASCADE",
});
// In your Booking model
Booking.hasOne(Payment, {
  foreignKey: "booking_id",
  onDelete: "CASCADE",
});

// Include the Payment model at the top of the file

module.exports = Booking;
