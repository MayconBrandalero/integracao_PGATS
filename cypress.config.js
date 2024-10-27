import { defineConfig } from 'cypress';

import {
  beforeRunHook,
  afterRunHook,
} from 'cypress-mochawesome-reporter/lib/index.js'; // Specify the index.js file directly

export default defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
      });

      on('after:run', async () => {
        console.log('override after:run');
        await afterRunHook();
      });
    },
  },
});
