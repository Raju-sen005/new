const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request.js");
const contactService = require("./contact.service.js");

// Routes
router.post("/", contactSchema, createContact);
router.get("/", getAllContacts);
router.delete("/:id", getByIdDelete);
router.put("/:id", contactSchema, updateById);

module.exports = router;

// Validation
function contactSchema(req, res, next) {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    subject: Joi.string().min(5).required(),
    message: Joi.string().min(10).required(),
  });

  validateRequest(req, next, schema);
}

// Handlers
function createContact(req, res, next) {
  contactService
    .createContact(req.body)
    .then((contact) =>
      res.json({ message: "Message sent successfully", contact })
    )
    .catch(next);
}

function getAllContacts(req, res, next) {
  contactService
    .getAllContacts()
    .then((contacts) => res.json(contacts))
    .catch(next);
}
function getByIdDelete(req, res, next) {
  contactService
    .getByIdDelete(req.params.id)
    .then(() => res.json({ message: `Contact deleted` }))
    .catch(next);
}
function updateById(req, res, next) {
  contactService
    .updateById(req.params.id, req.body)
    .then((updatedContact) =>
      res.json({ message: "Contact updated successfully", updatedContact })
    )
    .catch(next);
}
