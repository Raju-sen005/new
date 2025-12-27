// routes/orders.routes.js
const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validateRequest = require("../_middleware/validate-request.js");
const authorize = require("../_middleware/authorize.js");
const Role = require("../_helpers/role.js");
const orderService = require("./orders.service.js");

// routes
router.post("/", authorize(), createOrderSchema, createOrder);
router.put("/:id", authorize(), updateOrderSchema, updateOrder);
router.delete("/:id", authorize(), deleteOrder); //admin
router.get("/", authorize(), getAllOrders);
router.get("/:id", authorize(), getOrderById);

// export
module.exports = router;

// validation and handlers
function createOrderSchema(req, res, next) {
  const schema = Joi.object({
    customerId: Joi.number().required(),
    customerName: Joi.string().required(),
    orderCustomer: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    }).required(),
    shippingAddress: Joi.object({
      name: Joi.string().required(),
      company: Joi.string().required(),
      address: Joi.string().required(),
      city: Joi.string().required(),
      country: Joi.string().required(),
      state: Joi.string().required(),
      zip: Joi.string().required(),
      phone: Joi.string().required(),
    }).required(),
    date: Joi.date().required(),
    status: Joi.string()
      .valid("Pending", "Processing", "Fulfilled", "Delivered")
      .required(),
    total: Joi.number().required(),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          metal: Joi.string().required(),
          productName: Joi.string().required(),
          size: Joi.string().required(),
          quantity: Joi.number().required(),
          price: Joi.number().required(),
        })
      )
      .min(1)
      .required(),
  });
  validateRequest(req, next, schema);
}

function updateOrderSchema(req, res, next) {
  const schema = Joi.object({
    customerId: Joi.number().optional(),
    customerName: Joi.string().optional(),
    orderCustomer: Joi.object({
      name: Joi.string().optional(),
      email: Joi.string().email().optional(),
      phone: Joi.string().optional(),
    }).optional(),
    shippingAddress: Joi.object({
      name: Joi.string().optional(),
      company: Joi.string().optional(),
      address: Joi.string().optional(),
      city: Joi.string().optional(),
      country: Joi.string().optional(),
      state: Joi.string().optional(),
      zip: Joi.string().optional(),
      phone: Joi.string().optional(),
    }).optional(),
    date: Joi.date().optional(),
    status: Joi.string()
      .valid("Pending", "Processing", "Fulfilled", "Delivered")
      .optional(),
    total: Joi.number().optional(),
    items: Joi.array()
      .items(
        Joi.object({
          productId: Joi.string().required(),
          metal: Joi.string().required(),
          productName: Joi.string().required(),
          quantity: Joi.number().required(),
          price: Joi.number().required(),
          size: Joi.string().required(),
        })
      )
      .optional(),
  });
  validateRequest(req, next, schema);
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await orderService.getAll();
    res.json(orders);
  } catch (error) {
    next(error);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await orderService.getById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
}

function createOrder(req, res, next) {
  orderService
    .createOrder(req.body)
    .then((order) => res.json(order))
    .catch(next);
}

function updateOrder(req, res, next) {
  orderService
    .updateOrder(req.params.id, req.body)
    .then((order) => res.json(order))
    .catch(next);
}

function deleteOrder(req, res, next) {
  orderService
    .deleteOrder(req.params.id)
    .then(() => res.json({ message: "Order deleted" }))
    .catch(next);
}
