import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/Lab3-4/", // Укажите путь к вашей поддиректории
  plugins: [react()],
});
