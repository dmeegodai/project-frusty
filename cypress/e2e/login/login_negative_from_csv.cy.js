import loginPage from '../../support/page_objects/loginPage';

describe('Negative Login Tests (from CSV)', () => {

  it('should display an error message for all invalid scenarios', () => {
    cy.task('readCsv', 'login_scenarios.csv').then((testCases) => {
      expect(testCases).to.be.an('array').and.not.be.empty;
      testCases.forEach(({ description, username, password }) => {
        cy.log(`--- Running test: ${description} ---`);
        loginPage.visit(); 
        cy.login(username || '', password || '');
        loginPage.verifyErrorMessage();
      });
    });
  });
});