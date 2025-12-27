const express = require("express");
const router = express.Router();
const authorize = require("../_middleware/authorize.js");
const Role = require("../_helpers/role.js");
const productService = require("./product.service.js");
const upload = require("../_middleware/upload.js");

router.post("/", authorize(Role.Admin), upload.any(), createProduct);
router.put("/:id", authorize(Role.Admin), upload.any(), updateProduct);
router.delete("/:id", authorize(Role.Admin), deleteProduct);
router.get("/", getAllProducts);
router.get("/category/:categoryName", getProductsByCategory);
router.get("/:id", getProductById);
module.exports = router;

function parseJSONSafe(data) {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  try { return JSON.parse(data); } catch { return []; }
}

// ✅ Create Product Handler
async function createProduct(req, res) {
  try {
    let productData = req.body;

    // Parse variants
    if (typeof productData.variants === "string") {
      productData.variants = JSON.parse(productData.variants);
    }

    // Map images
    const fileMap = {};
    (req.files || []).forEach((file) => {
      const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
      if (match) {
        const idx = match[1];
        fileMap[idx] = fileMap[idx] || [];
        fileMap[idx].push(file.filename);
      }
    });

    productData.variants?.forEach((variant, i) => {
      variant.images = fileMap[i] || [];
      variant.price = parseJSONSafe(variant.price);
      variant.metal = parseJSONSafe(variant.metal);
      variant.categories = parseJSONSafe(variant.categories);
      variant.subCategories = parseJSONSafe(variant.subCategories);
      variant.themes = parseJSONSafe(variant.themes);
      variant.purposes = parseJSONSafe(variant.purposes);
      variant.festivals = parseJSONSafe(variant.festivals);
      variant.sizes = parseJSONSafe(variant.sizes);
    });

    // ✅ Ensure top-level category exists
    if (!productData.category && productData.variants?.[0]?.categories?.[0]) {
      productData.category = productData.variants[0].categories[0]; // first variant category
    }

    const product = await productService.createProduct(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Error creating product", error: error.message });
  }
}


// ✅ Update Product Handler
async function updateProduct(req, res) {
  try {
    const id = req.params.id;
    let productData = req.body;

    if (typeof productData.variants === "string") productData.variants = JSON.parse(productData.variants);

    const fileMap = {};
    (req.files || []).forEach((file) => {
      const match = file.fieldname.match(/variants\[(\d+)\]\[images\]/);
      if (match) {
        const idx = match[1];
        fileMap[idx] = fileMap[idx] || [];
        fileMap[idx].push(file.filename);
      }
    });

    productData.variants?.forEach((variant, i) => {
      variant.images = fileMap[i] || parseJSONSafe(variant.images);
      variant.price = parseJSONSafe(variant.price);
      variant.metal = parseJSONSafe(variant.metal);
      variant.categories = parseJSONSafe(variant.categories);
      variant.subCategories = parseJSONSafe(variant.subCategories);
      variant.themes = parseJSONSafe(variant.themes);
      variant.purposes = parseJSONSafe(variant.purposes);
      variant.festivals = parseJSONSafe(variant.festivals);
      variant.sizes = parseJSONSafe(variant.sizes);
    });

    const updated = await productService.updateProduct(id, productData);
    res.json(updated);
  } catch (error) {
    console.error("Update Product Error:", error);
    res.status(500).json({ message: "Error updating product", error: error.message });
  }
}

// ✅ Other handlers
async function deleteProduct(req, res) { try { await productService.deleteProduct(req.params.id); res.json({ message: "Deleted" }); } catch (err) { console.error(err); res.status(500).json({ message: "Delete failed", error: err.message }); } }
async function getAllProducts(req, res) { try { const products = await productService.getAll(); res.json(products); } catch (err) { res.status(500).json({ message: err.message }); } }
async function getProductById(req, res) { try { const product = await productService.getById(req.params.id); res.json(product); } catch (err) { res.status(500).json({ message: err.message }); } }
async function getProductsByCategory(req, res) { try { const products = await productService.getByCategory(req.params.categoryName); res.json(products); } catch (err) { res.status(500).json({ message: err.message }); } }
