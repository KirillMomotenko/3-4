import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/3-4/", // Укажите путь к вашей поддиректории
  plugins: [react()],
});
