require("rootpath")();
require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./_middleware/error-handler.js");

// Add node-cron
const cron = require("node-cron");

// Set up Multer for file handling (adjusted for file uploads)
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/uploads", express.static("uploads"));

// API routes
app.use("/products", require("./products/product.controller.js"));
app.use("/contact", require("./contact/contact.controller.js"));
app.use("/category", require("./category/category.controller.js"));
app.use("/subcategory", require("./subcategory/subcategory.controller.js"));
app.use("/theme", require("./theme/subcategory.controller.js"));
app.use("/purpose", require("./purpose/subcategory.controller.js"));
app.use("/gemstone", require("./gemstone/subcategory.controller.js"));
app.use("/festival", require("./festival/subcategory.controller.js"));
app.use("/material", require("./material/subcategory.controller.js"));
app.use("/size", require("./sizes/subcategory.controller.js"));
app.use("/orders", require("./orders/orders.controller.js"));
app.use("/", require("./accounts/accounts.controller.js"));
app.use("/api-docs", require("./_helpers/swagger.js"));
app.use("/api/products", require("./products/product.controller.js"));

// Global error handler
app.use(errorHandler);

// ✅ Cron job: runs every 14 minutes
const axios = require("axios");

cron.schedule("*/14 * * * *", async () => {
  console.log("🔁 Cron job running every 14 minutes");

  try {
    const [backendRes, adminPanelRes] = await Promise.all([
      axios.get("https://ecom-backend-vs1b.onrender.com/"),
      axios.get("https://ecom-adminpanel.onrender.com/"),
    ]);

    console.log("✅ Backend ping success:", backendRes.status);
    console.log("✅ Admin panel ping success:", adminPanelRes.status);
  } catch (err) {
    console.error("❌ One or more pings failed:", err.message);
  }
});


const port =
  process.env.NODE_ENV === "production" ? process.env.PORT || 80 : 8000;
app.listen(port, () => console.log("🚀 Server listening on port " + port));
