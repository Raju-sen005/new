const { Op } = require("sequelize");

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAll,
  getById,
  getByCategory,
};

function getModels() {
  const db = require("../_helpers/db");
  return { Product: db.Product, ProductVariant: db.ProductVariant };
}

// ✅ Create Product with Variants
async function createProduct(params) {
  const { Product, ProductVariant } = getModels();

  // Create main product
  const product = await Product.create({
    name: params.name,
    description: params.description,
    price: params.price || "[]",
    category: params.category || "",
  });

  // Create variants
  if (Array.isArray(params.variants)) {
    for (const variant of params.variants) {
      await ProductVariant.create({
        ...variant,
        productId: product.id,
        images: variant.images || [],
        price: variant.price || [],
        metal: variant.metal || [],
        categories: variant.categories || [],
        subCategories: variant.subCategories || [],
        themes: variant.themes || [],
        purposes: variant.purposes || [],
        festivals: variant.festivals || [],
        sizes: variant.sizes || [],
      });
    }
  }

  return await getById(product.id);
}

// ✅ Get all products
async function getAll() {
  const { Product, ProductVariant } = getModels();
  return await Product.findAll({ include: [{ model: ProductVariant }] });
}

// ✅ Get by ID
async function getById(id) {
  const { Product, ProductVariant } = getModels();
  return await Product.findByPk(id, { include: [{ model: ProductVariant }] });
}

// ✅ Get by Category (case-insensitive)
async function getByCategory(categoryName) {
  const { Product, ProductVariant } = getModels();
  return await Product.findAll({
    where: { category: { [Op.like]: categoryName } },
    include: [{ model: ProductVariant }],
  });
}

// ✅ Update product + variants
async function updateProduct(id, params) {
  const { Product, ProductVariant } = getModels();
  const product = await Product.findByPk(id, { include: [{ model: ProductVariant }] });
  if (!product) throw "Product not found";

  await product.update({
    name: params.name || product.name,
    description: params.description || product.description,
    price: params.price || product.price,
    category: params.category || product.category,
  });

  if (Array.isArray(params.variants)) {
    const existingVariants = await ProductVariant.findAll({ where: { productId: id } });
    const existingIds = existingVariants.map((v) => v.id);

    for (const variantData of params.variants) {
      if (variantData.id && existingIds.includes(variantData.id)) {
        const variant = existingVariants.find((v) => v.id === variantData.id);
        await variant.update({ ...variantData, images: variantData.images || variant.images });
      } else if (!variantData.id) {
        await ProductVariant.create({ ...variantData, productId: id, images: variantData.images || [] });
      }
    }

    const newIds = params.variants.map((v) => v.id).filter(Boolean);
    const toDelete = existingIds.filter((vid) => !newIds.includes(vid));
    if (toDelete.length > 0) {
      await ProductVariant.destroy({ where: { id: toDelete } });
    }
  }

  return await getById(id);
}

// ✅ Delete product + variants
async function deleteProduct(id) {
  const { Product, ProductVariant } = getModels();
  const product = await Product.findByPk(id);
  if (!product) throw "Product not found";

  await ProductVariant.destroy({ where: { productId: id } });
  await product.destroy();

  return { message: "Product and its variants deleted successfully" };
}
