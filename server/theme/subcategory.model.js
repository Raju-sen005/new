const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, // image filename
      allowNull: true,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
    },
  };
  
  const options = {
    timestamps: false,
  };

  return sequelize.define("Theme", attributes, options);
};
