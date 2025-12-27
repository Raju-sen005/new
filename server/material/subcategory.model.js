const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    material: {
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

  return sequelize.define("Material", attributes, options); // <- Capital P here is good
};
