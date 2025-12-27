const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {   // 👈 naya column
      type: DataTypes.STRING,
      allowNull: true,
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

  return sequelize.define("Category", attributes, options);
};
