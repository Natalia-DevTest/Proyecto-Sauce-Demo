import { defineConfig } from "cypress";

export default defineConfig({
  waitForAnimations: false,
  animationDistanceThreshold: 50,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
