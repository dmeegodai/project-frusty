import loginPage from '../../support/page_objects/loginPage';

describe('cy.intercept() Example for ParaBank', () => {
  beforeEach(() => {
    // Intercept the GET request that fetches the user's accounts after login.
    // We use a glob pattern '**' to match any host/path prefix.
    cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
      fixture: 'mock_accounts.json',
    }).as('getAccounts');

    // We also need to log in to trigger the application to make this API call.
    // We can use a fixture for the login credentials.
    cy.fixture('users').then((user) => {
      loginPage.visit();
      cy.login(user.valid.username, user.valid.password);
    });
  });

  it('should display mocked account data on the overview page', () => {
    // Wait for the intercepted request to complete.
    cy.wait('@getAccounts');

    // Now, assert that the UI displays the data from our mock fixture.
    // The mock data has account ID 98765 with a balance of $1234.56.
    cy.get('#accountTable').should('contain', '98765').and('contain', '$1234.56');

    // We can also assert on the interception object itself.
    cy.get('@getAccounts').its('response.body').then((body) => {
      expect(body).to.have.length(2);
      expect(body[0].id).to.equal(98765);
    });
  });
});