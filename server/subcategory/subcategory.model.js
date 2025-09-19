const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    subcategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
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

  return sequelize.define("Subcategory", attributes, options); // <- Capital P here is good
};
