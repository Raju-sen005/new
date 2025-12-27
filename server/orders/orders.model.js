const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  return sequelize.define(
    "Order",
    {
      orderCustomerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Customers",
          key: "id",
        },
      },
      customerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "accounts", // 👈 currently a string
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      shippingAddressId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "ShippingAddresses",
          key: "id",
        },
      },
      customerName: { type: DataTypes.STRING, allowNull: false },
      date: { type: DataTypes.DATEONLY, allowNull: false },
      status: {
        type: DataTypes.ENUM("Pending", "Processing", "Fulfilled", "Delivered"),
        allowNull: false,
      },
      total: { type: DataTypes.FLOAT, allowNull: false },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updated: { type: DataTypes.DATE },
    },
    {
      timestamps: false,
    }
  );
};
