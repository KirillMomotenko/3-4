import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/todo-app/", // Укажите путь к вашей поддиректории
  plugins: [react()],
});
