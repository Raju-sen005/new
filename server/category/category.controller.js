const express = require("express");
const router = express.Router();
const Joi = require("joi");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const validateRequest = require("../_middleware/validate-request.js");
const categoryService = require("./category.service.js");

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "uploads/categories";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// ✅ Routes
router.post("/", upload.single("image"), categorySchema, createcategory);
router.get("/", getAllcategorys);
router.get("/:id", getCategoryById);
router.delete("/:id", getByIdDelete);
router.put("/:id", upload.single("image"), categorySchema, updateById);

module.exports = router;

// ================= Validation =================
function categorySchema(req, res, next) {
  const schema = Joi.object({
    category: Joi.string().min(1).required(),
  });
  validateRequest(req, next, schema);
}

// ================= Handlers =================
function createcategory(req, res, next) {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  categoryService.createCategory(data)
    .then((category) => res.json({ message: "Category created", category }))
    .catch(next);
}

function getAllcategorys(req, res, next) {
  categoryService.getAllCategorys()
    .then((categories) => res.json(categories))
    .catch(next);
}

async function getCategoryById(req, res, next) {
  try {
    const category = await categoryService.getById(req.params.id);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (err) {
    next(err);
  }
}

function getByIdDelete(req, res, next) {
  categoryService.getByIdDelete(req.params.id)
    .then(() => res.json({ message: "Category deleted" }))
    .catch(next);
}

function updateById(req, res, next) {
  const data = { ...req.body };
  if (req.file) data.image = req.file.path;
  categoryService.updateById(req.params.id, data)
    .then((updated) => res.json({ message: "Category updated", updated }))
    .catch(next);
}
