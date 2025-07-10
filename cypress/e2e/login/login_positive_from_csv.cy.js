import loginPage from '../../support/page_objects/loginPage';

// We still need papaparse to process the CSV content
const Papa = require('papaparse');

describe('Positive Login Tests (from CSV with papaparse)', () => {
  it('should successfully log in with all positive scenarios', () => {
    cy.fixture('login_positive_scenarios.csv').then((csvContent) => {
      const testCases = Papa.parse(csvContent, {
        header: true,
        skipEmptyLines: true,
      }).data;

      // Use cy.wrap() to bring the testCases array into the Cypress command chain
      cy.wrap(testCases).each((testCase) => {
        const { description, username, password } = testCase;

        cy.log(`--- Running test: ${description} ---`);

        loginPage.visit();
        cy.login(username, password);
        loginPage.verifyLoginSuccess();
      });
    });
  });
});