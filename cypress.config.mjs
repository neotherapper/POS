import { defineConfig } from "cypress";
import { mergeConfig, loadEnv } from "vite";
import { devServer } from "@cypress/vite-dev-server";
import codeCoverageTask from "@cypress/code-coverage/task";
import istanbul from "@cypress/code-coverage/use-babelrc";
import * as viteConfig from "./vite.config.mjs  ";

export default defineConfig({
  retries: {
    runMode: 2,
  },
  e2e: {
    baseUrl: "http://localhost:3000",
    specPattern: "cypress/tests/**/*.spec.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    viewportHeight: 1000,
    viewportWidth: 1280,
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      // tell Cypress to use .babelrc file
      // and instrument the specs files
      // only the extra application files will be instrumented
      // not the spec files themselves
      // on("file:preprocessor", istanbul);
      return config;
    },
  },
  component: {
    devServer(devServerConfig) {
      const conf = {
        define: {
          "process.env": loadEnv("development", process.cwd(), "VITE"),
        },
        server: {
          /**
           * start the CT dev server on a different port than the full RWA
           * so users can switch between CT and E2E testing without having to
           * stop/start the RWA dev server.
           */
          port: 3002,
        },
      };

      const resolvedViteConfig = mergeConfig(viteConfig, conf);
      return devServer({
        ...devServerConfig,
        framework: "react",
        viteConfig: resolvedViteConfig,
      });
    },
    specPattern: "src/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
