import loginPage from '../../support/page_objects/loginPage';

describe('Data-Driven Login Test', () => {
  it('should successfully log in with credentials from the file', () => {
    // Use the 'readCsv' task defined in cypress.config.js for consistency.
    // This is more efficient and aligns with your other CSV-driven tests.
    // Pointing to the consolidated file for positive scenarios.
    cy.task('readCsv', 'login_positive_scenarios.csv').then((allUsers) => {
      // Ensure the task returned a non-empty array before proceeding.
      expect(allUsers).to.be.an('array').and.not.be.empty;

      allUsers.forEach((userData) => {
        cy.log(`--- Testing with: ${userData.description} ---`);

        // Use the Page Object Model to visit the page, keeping tests consistent.
        loginPage.visit();
        cy.login(userData.username, userData.password);

        // This single call now handles both success and the known server error case.
        loginPage.verifyLoginSuccess();
      });
    });
  });
});