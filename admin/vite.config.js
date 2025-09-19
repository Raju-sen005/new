import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { config } from "dotenv";
config();

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3001, // or whatever your Render service detects
    allowedHosts: 'all', // ✅ Allow all hosts (including Render)
  },
  define: {
    "process.env": process.env,
  },
});
