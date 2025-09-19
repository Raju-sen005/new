const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "OrderItem",
    {
      orderId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: sequelize.models.Order, // ✅ use the actual model
          key: "id",
        },
        onDelete: "CASCADE",
      },
      productName: { type: DataTypes.STRING, allowNull: false },
      productId: { type: DataTypes.STRING, allowNull: false },
      size: { type: DataTypes.STRING, allowNull: false },
      metal: { type: DataTypes.STRING, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      timestamps: false,
    }
  );
};
