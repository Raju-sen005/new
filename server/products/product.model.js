// product.model.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  // Associations (one-to-many with ProductVariant)
  Product.associate = (models) => {
    Product.hasMany(models.ProductVariant, { foreignKey: "productId" });
  };

  return Product;
};
