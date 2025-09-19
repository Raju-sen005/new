// const config = require("config.json");
const mysql = require("mysql2/promise");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

module.exports = db = {};

initialize();

async function initialize() {
  const host = process.env.DB_HOST;
  // const { port, user, password, database } = config.database;

  // Create the database if it doesn't exist
  const connection = await mysql.createConnection({
    host,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });
  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`
  );

  // Connect to database
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT, // <--- Add this
      dialect: "mysql",
    }
  );

  db.Account = require("../accounts/account.model.js")(sequelize, DataTypes);
  //
  db.Product = require("../products/product.model.js")(sequelize, DataTypes);
  db.ProductVariant = require("../products/productVariant.model.js")(
    sequelize,
    DataTypes
  );
  if (db.Product.associate) db.Product.associate(db);
  if (db.ProductVariant.associate) db.ProductVariant.associate(db);
  //
  // Run model associations
  db.Contact = require("../contact/contact.model.js")(sequelize, DataTypes);
  db.Category = require("../category/category.model.js")(sequelize, DataTypes);
  db.Subcategory = require("../subcategory/subcategory.model.js")(
    sequelize,
    DataTypes
  );
  db.Theme = require("../theme/subcategory.model.js")(sequelize, DataTypes);
  db.Gemstone = require("../gemstone/subcategory.model.js")(
    sequelize,
    DataTypes
  );
  db.Purpose = require("../purpose/subcategory.model.js")(sequelize, DataTypes);
  db.Festival = require("../festival/subcategory.model.js")(
    sequelize,
    DataTypes
  );
  db.Material = require("../material/subcategory.model.js")(
    sequelize,
    DataTypes
  );
  db.Size = require("../sizes/subcategory.model.js")(sequelize, DataTypes);
  //
  db.RefreshToken = require("../accounts/refresh-token.model.js")(
    sequelize,
    DataTypes
  );

  db.Customer = require("../orders/orderCustomer.model.js")(
    sequelize,
    DataTypes
  );
  db.ShippingAddress = require("../orders/shippingadress.model.js")(
    sequelize,
    DataTypes
  );
  db.OrderCustomer = require("../orders/orderCustomer.model.js")(
    sequelize,
    DataTypes
  ); // ✅ Add this line

  db.Order = require("../orders/orders.model.js")(sequelize, DataTypes);
  db.OrderItem = require("../orders/ordersitem.model.js")(sequelize, DataTypes);

  // Define relationships
  db.Order.hasMany(db.OrderItem, { foreignKey: "orderId", as: "items" });
  db.OrderItem.belongsTo(db.Order, { foreignKey: "orderId" });

  db.Account.hasMany(db.Order, { foreignKey: "customerId", as: "orders" });
  db.Order.belongsTo(db.Account, { foreignKey: "customerId", as: "customer" });

  db.Customer.hasMany(db.Order, {
    foreignKey: "orderCustomerId",
    as: "customerOrders",
  });
  db.Order.belongsTo(db.Customer, {
    foreignKey: "orderCustomerId",
    as: "orderCustomer",
  });

  db.ShippingAddress.hasMany(db.Order, {
    foreignKey: "shippingAddressId",
    as: "addressOrders",
  });
  db.Order.belongsTo(db.ShippingAddress, {
    foreignKey: "shippingAddressId",
    as: "shippingAddress",
  });

  db.Account.hasMany(db.RefreshToken, { onDelete: "CASCADE" });
  db.RefreshToken.belongsTo(db.Account);

  // Sync all models
  await sequelize.sync();
}
