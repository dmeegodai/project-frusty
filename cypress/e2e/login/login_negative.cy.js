import loginPage from '../../support/page_objects/loginPage';

describe('Negative Login Tests', () => {
  beforeEach(() => {
    loginPage.visit();
  });

  const testCases = [
    {
      description: 'invalid credentials',
      usernameKey: 'invalid',
      passwordKey: 'invalid',
    },
    {
      description: 'empty username',
      usernameKey: 'empty',
      passwordKey: 'valid',
    },
    {
      description: 'empty password',
      usernameKey: 'valid',
      passwordKey: 'empty',
    },
    {
      description: 'both fields empty',
      usernameKey: 'empty',
      passwordKey: 'empty',
    },
  ];

  testCases.forEach(({ description, usernameKey, passwordKey }) => {
    it(`should display an error message with ${description}`, () => {
      cy.fixture('users').then((usersData) => {
        cy.login(usersData[usernameKey].username, usersData[passwordKey].password);
      });
      loginPage.verifyErrorMessage();
    });
  });
});