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

const apiRouter = express.Router();

app.use("/uploads", express.static("uploads"));

// API routes
apiRouter.use("/products", require("./products/product.controller.js"));
apiRouter.use("/contact", require("./contact/contact.controller.js"));
apiRouter.use("/category", require("./category/category.controller.js"));
apiRouter.use("/subcategory", require("./subcategory/subcategory.controller.js"));
apiRouter.use("/theme", require("./theme/subcategory.controller.js"));
apiRouter.use("/purpose", require("./purpose/subcategory.controller.js"));
apiRouter.use("/gemstone", require("./gemstone/subcategory.controller.js"));
apiRouter.use("/festival", require("./festival/subcategory.controller.js"));
apiRouter.use("/material", require("./material/subcategory.controller.js"));
apiRouter.use("/size", require("./sizes/subcategory.controller.js"));
apiRouter.use("/orders", require("./orders/orders.controller.js"));
apiRouter.use("/", require("./accounts/accounts.controller.js"));
apiRouter.use("/api-docs", require("./_helpers/swagger.js"));
// apiRouter.use("/products", require("./products/product.controller.js"));

app.use("/api", apiRouter);

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
