const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request.js");
const categoryService = require("./subcategory.service.js");

// Routes
router.post("/", categorySchema, createcategory);
router.get("/", getAllcategorys);
router.delete("/:id", getByIdDelete);
router.put("/:id", categorySchema, updateById);

module.exports = router;

// Validation
function categorySchema(req, res, next) {
  const schema = Joi.object({
    material: Joi.string().min(1).required(),
  });

  validateRequest(req, next, schema);
}

// Handlers
function createcategory(req, res, next) {
  categoryService.createCategory(req.body)
    .then((category) =>
      res.json({ message: "Message sent successfully", category })
    )
    .catch(next);
}

function getAllcategorys(req, res, next) {
  categoryService
    .getAllCategorys()
    .then((categorys) => res.json(categorys))
    .catch(next);
}
function getByIdDelete(req, res, next) {
  categoryService
    .getByIdDelete(req.params.id)
    .then(() => res.json({ message: `category deleted` }))
    .catch(next);
}
function updateById(req, res, next) {
  categoryService
    .updateById(req.params.id, req.body)
    .then((updatedContact) =>
      res.json({ message: "Category updated successfully", updatedContact })
    )
    .catch(next);
}
