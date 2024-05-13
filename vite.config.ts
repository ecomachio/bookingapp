import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    base: loadEnv(mode, process.cwd()).VITE_APP_BASE,
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    test: {
      include: ["**/*.test.tsx"],
      globals: true,
      environment: "jsdom",
    },
  };
});
