import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import istanbul from "vite-plugin-istanbul";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "VITE");
  return {
    // expose all vite "VITE_*" variables as process.env.VITE_* in the browser
    define: {
      "process.env": env,
    },
    server: {
      port: 3000,
    },
    build: {
      outDir: "dist",
      sourcemap: true,
    },
    plugins: [
      react(),
      TanStackRouterVite(),
      istanbul({
        cypress: true,
        requireEnv: true,
        exclude: ["node_modules", "cypress", "dist"],
        forceBuildInstrument: true,
      }),
    ],
    test: {
      environment: "jsdom",
      setupFiles: "./src/setup-tests.js",
      exclude: ["node_modules", "cypress", "dist"],
    },
  };
});
