// productVariant.model.js
module.exports = (sequelize, DataTypes) => {
  const ProductVariant = sequelize.define("ProductVariant", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gemstone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.JSON, // ✅ for MySQL
      allowNull: true,
    },
    categories: {
      type: DataTypes.JSON, // ✅ for MySQL
      allowNull: true,
    },
    subCategories: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    themes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    purposes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    festivals: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    metal: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    sizes: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  });

  // Associations (many-to-one with Product)
  ProductVariant.associate = (models) => {
    ProductVariant.belongsTo(models.Product, { foreignKey: "productId" });
  };

  return ProductVariant;
};
