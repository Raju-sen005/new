const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    size: {
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

  return sequelize.define("Size", attributes, options); // <- Capital P here is good
};
