import { reactRouter } from "@react-router/dev/vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), svgr()],
  resolve: {
    tsconfigPaths: true,
    alias: {
      "@components": path.resolve(__dirname, "./app/components"),
      "@redux": path.resolve(__dirname, "./app/redux"),
      "@pages": path.resolve(__dirname, "./app/routes"),
      "@assets": path.resolve(__dirname, "./app/assets"),
      "@schemas": path.resolve(__dirname, "./app/schemas"),
    },
  },
});
