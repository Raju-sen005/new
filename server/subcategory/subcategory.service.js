module.exports = {
  createCategory,
  getAllCategorys,
  getByIdDelete,
  updateById,
};

function getCategoryModel() {
  const db = require("../_helpers/db.js"); // force fresh require
  return db.Subcategory;
}

async function createCategory(CategoryData) {
  const Category = getCategoryModel();
  return await Category.create(CategoryData);
}

async function getAllCategorys() {
  const Category = getCategoryModel();

  const categories = await Category.findAll();

  const formattedCategories = categories.map((cat) => ({
    id: cat.id,
    name: cat.subcategory,
    subcategory: cat.subcategory,
    category: cat.category,
  }));

  return formattedCategories;
}
async function getByIdDelete(id) {
  try {
    const Category = getCategoryModel();
    const product = await Category.findByPk(id);
    if (!product) throw "Category not found";
    await product.destroy();
    // return await
  } catch (error) {
    console.error("Error deleting Category:", error);
    throw error;
  }
}
async function updateById(id, CategoryData) {
  try {
    console.log(id, CategoryData);

    const Category = getCategoryModel();
    const category = await Category.findByPk(id);
    if (!category) throw "Category not found";
    await category.update(CategoryData);
    return category;
  } catch (error) {
    console.error("Error updating Category:", error);
    throw error;
  }
}
