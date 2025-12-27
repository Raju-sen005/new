const db = require("../_helpers/db.js");

function getCategoryModel() {
  return db.Category;
}

async function createCategory(CategoryData) {
  const Category = getCategoryModel();
  return await Category.create(CategoryData);
}

async function getAllCategorys() {
  const Category = getCategoryModel();
  const categories = await Category.findAll();
  return categories.map(cat => ({
    id: cat.id,
    category: cat.category,
    image: cat.image ? `${process.env.BASE_URL || "http://localhost:8000"}/${cat.image.replace(/\\/g, "/")}` : null
  }));
}

async function getById(id) {
  const Category = getCategoryModel();
  const cat = await Category.findByPk(id);
  if (!cat) return null;
  return {
    id: cat.id,
    category: cat.category,
    image: cat.image ? `${process.env.BASE_URL || "http://localhost:8000"}/${cat.image.replace(/\\/g, "/")}` : null
  };
}

async function getByIdDelete(id) {
  const Category = getCategoryModel();
  const cat = await Category.findByPk(id);
  if (!cat) throw "Category not found";
  await cat.destroy();
}

async function updateById(id, CategoryData) {
  const Category = getCategoryModel();
  const cat = await Category.findByPk(id);
  if (!cat) throw "Category not found";
  await cat.update(CategoryData);
  return {
    id: cat.id,
    category: cat.category,
    image: cat.image ? `${process.env.BASE_URL || "http://localhost:8000"}/${cat.image.replace(/\\/g, "/")}` : null
  };
}

module.exports = {
  createCategory,
  getAllCategorys,
  getById,
  getByIdDelete,
  updateById,
};
