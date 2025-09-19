const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request.js");
const themeService = require("./subcategory.service.js");
const upload = require("../_middleware/upload.js");

// Routes
router.post("/", upload.single("image"), themeSchema, createTheme);
router.get("/", getAllThemes);
router.delete("/:id", deleteThemeById);
router.put("/:id", upload.single("image"), themeSchema, updateThemeById);

module.exports = router;

// Validation
function themeSchema(req, res, next) {
  const schema = Joi.object({
    theme: Joi.string().min(1).required(),
  });

  validateRequest(req, next, schema);
}

// Handlers
function createTheme(req, res, next) {
  const data = { ...req.body };
  if (req.file) {
    // ✅ Sirf filename save karo (abc.jpg)
    data.image = req.file.filename;
  }

  themeService.createTheme(data)
    .then(theme => res.json({ message: "Theme created successfully", theme }))
    .catch(next);
}

function getAllThemes(req, res, next) {
  themeService.getAllThemes()
    .then(themes => res.json(themes))
    .catch(next);
}

function deleteThemeById(req, res, next) {
  themeService.deleteThemeById(req.params.id)
    .then(() => res.json({ message: "Theme deleted successfully" }))
    .catch(next);
}

function updateThemeById(req, res, next) {
  const data = { ...req.body };
  if (req.file) {
    // ✅ Update bhi sirf filename rakho
    data.image = req.file.filename;
  }

  themeService.updateThemeById(req.params.id, data)
    .then(theme => res.json({ message: "Theme updated successfully", theme }))
    .catch(next);
}
