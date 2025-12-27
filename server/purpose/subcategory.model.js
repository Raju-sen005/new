const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    purpose: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATE },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Purpose", attributes, options); // <- Capital P here is good
};
