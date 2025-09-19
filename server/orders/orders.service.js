module.exports = {
  createOrder,
  updateOrder,
  deleteOrder,
  getAll,
  getById,
};

function getOrderModels() {
  const db = require("../_helpers/db.js"); // force fresh require
  console.log("Models loaded in getOrderModels:", Object.keys(db)); // <== ADD THIS

  return {
    Order: db.Order,
    OrderItem: db.OrderItem,
    Account: db.Account,
    OrderCustomer: db.OrderCustomer,
    ShippingAddress: db.ShippingAddress,
  };
}

async function getAll() {
  const { Order, OrderItem, Account, OrderCustomer, ShippingAddress } =
    getOrderModels();
  return await Order.findAll({
    include: [
      { model: OrderItem, as: "items" },
      {
        model: Account,
        attributes: ["id", "firstName", "lastName", "email"],
        as: "customer",
      },
      { model: OrderCustomer, as: "orderCustomer" },
      { model: ShippingAddress, as: "shippingAddress" },
    ],
    order: [["created", "DESC"]],
  });
}

async function getById(id) {
  const { Order, OrderItem, Account, OrderCustomer, ShippingAddress } =
    getOrderModels();
  return await Order.findByPk(id, {
    include: [
      { model: OrderItem, as: "items" },
      {
        model: Account,
        attributes: ["id", "firstName", "lastName", "email"],
        as: "customer",
      },
      { model: OrderCustomer, as: "orderCustomer" },
      { model: ShippingAddress, as: "shippingAddress" },
    ],
  });
}

async function createOrder(params) {
  try {
    const { Order, OrderItem, OrderCustomer, ShippingAddress } =
      getOrderModels();
    // console.log("OrderCustomer model:", OrderCustomer); // Add this

    // console.log("Params inside createOrder:", params);

    const { items, orderCustomer, shippingAddress, ...orderData } = params;
    console.log("items",items);
    

    const savedCustomer = await OrderCustomer.create(orderCustomer);
    const savedAddress = await ShippingAddress.create(shippingAddress);

    const order = await Order.create({
      ...orderData,
      orderCustomerId: savedCustomer.id,
      shippingAddressId: savedAddress.id,
    });

    if (items && items.length > 0) {
      const orderItems = items.map((item) => ({ ...item, orderId: order.id }));
      await OrderItem.bulkCreate(orderItems);
    }

    return await getById(order.id); // return full order with items
  } catch (error) {
    // console.error("Error creating order:", error);
    throw error;
  }
}

async function updateOrder(id, params) {
  try {
    const { Order, OrderItem, OrderCustomer, ShippingAddress } =
      getOrderModels();
    const order = await Order.findByPk(id);

    if (!order) throw "Order not found";

    const { items, orderCustomer, shippingAddress, ...orderData } = params;

    Object.assign(order, orderData);
    await order.save();

    if (orderCustomer && order.orderCustomerId) {
      const existingCustomer = await OrderCustomer.findByPk(
        order.orderCustomerId
      );
      if (existingCustomer) {
        Object.assign(existingCustomer, orderCustomer);
        await existingCustomer.save();
      }
    }

    if (shippingAddress && order.shippingAddressId) {
      const existingAddress = await ShippingAddress.findByPk(
        order.shippingAddressId
      );
      if (existingAddress) {
        Object.assign(existingAddress, shippingAddress);
        await existingAddress.save();
      }
    }

    if (items) {
      await OrderItem.destroy({ where: { orderId: id } });
      const updatedItems = items.map((item) => ({ ...item, orderId: id }));
      await OrderItem.bulkCreate(updatedItems);
    }

    return await getById(id);
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}

async function deleteOrder(id) {
  try {
    const { Order, OrderItem, OrderCustomer, ShippingAddress } =
      getOrderModels();
    const order = await Order.findByPk(id);

    if (!order) throw "Order not found";

    await OrderItem.destroy({ where: { orderId: id } });

    if (order.orderCustomerId)
      await OrderCustomer.destroy({ where: { id: order.orderCustomerId } });
    if (order.shippingAddressId)
      await ShippingAddress.destroy({ where: { id: order.shippingAddressId } });

    await order.destroy();
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
