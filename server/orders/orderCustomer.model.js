// models/Customer.js
const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define("Customer", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
