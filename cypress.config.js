const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  video: true,                                
  screenshotOnRunFailure: true,  
  e2e: {
    baseUrl: 'https://parabank.parasoft.com/parabank/',
    specPattern: "cypress/e2e/**/*.cy.{js,ts}",
    excludeSpecPattern: [
      'cypress/e2e/api/**/*', 
      'cypress/e2e/**/intercept_example.cy.js' 
    ],
    setupNodeEvents(on, config) {
      on('task', {
        async readCsv(filename) {
          const { default: neatCsv } = await import('neat-csv');
          const filePath = path.resolve(config.fixturesFolder, filename);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          return neatCsv(fileContent);
        }, log(message) {
          console.log('TASK LOG:', message);
          return null;
        }, 
      });
    },
  },
});
