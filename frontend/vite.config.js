import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { config } from "dotenv";
config();

export default defineConfig({
  plugins: [tailwindcss(), [react()]],
  server: {
    host: "0.0.0.0",
    port: 3000,
    allowedHosts: ["ecom-frontend-8i46.onrender.com"],
  },
  define: {
    "process.env": process.env,
  },
});