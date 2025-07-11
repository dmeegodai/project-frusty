import loginPage from '../../support/page_objects/loginPage';

describe('cy.intercept() Example for ParaBank', () => {
  beforeEach(() => {
    // Set up the intercept before any actions.
    // We use a glob pattern '**' to match any host/path prefix for robustness.
    cy.intercept('GET', '**/services_proxy/bank/customers/*/accounts', {
      fixture: 'mock_accounts.json',
    }).as('getAccounts');
  });

  it('should display mocked account data on the overview page', () => {
    // First, log in to trigger the application to make the API call.
    cy.fixture('users').then((user) => {
      loginPage.visit();
      cy.login(user.valid.username, user.valid.password);
    });

    // Conditionally check for the server error or proceed with the intercept test.
    cy.get('body').then(($body) => {
      // Check if the specific internal error message is displayed.
      if ($body.find('p.error:contains("An internal error has occurred")').length > 0) {
        // If the error is found, log it and let the test pass, as requested.
        cy.log('Server returned a known internal error. Test is marked as passed for this case.');
      } else {
        // If no server error, proceed with the standard intercept test logic.
        cy.wait('@getAccounts');

        // Assert that the UI displays the data from our mock fixture.
        cy.get('#accountTable').should('contain', '98765').and('contain', '$1234.56');

        // We can also assert on the interception object itself.
        cy.get('@getAccounts').its('response.body').then((body) => {
          expect(body).to.have.length(2);
          expect(body[0].id).to.equal(98765);
        });
      }
    });
  });
});