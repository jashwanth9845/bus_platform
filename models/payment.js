const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Import your Sequelize instance

const Payment = sequelize.define("Payment", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  booking_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  is_refunded: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Payment;
