describe('cy.intercept() Example', () => {
  beforeEach(() => {
    // Intercept the GET request for a user's profile data.
    // We'll tell Cypress to respond with our mock data from the fixture file.
    // The route matcher '/api/v1/user/*' will catch any user profile requests.
    cy.intercept('GET', '/api/v1/user/*', { fixture: 'mock_user.json' }).as('getUserProfile');

    // For this example, we'll visit the home page. In a real application,
    // you would visit the page that triggers this API call (e.g., a profile page).
    cy.visit('/');
  });

  it('should display mocked user data', () => {
    // We wait for the intercepted request to ensure it has completed
    // before we make any assertions.
    cy.wait('@getUserProfile');

    // In a real test, you would now assert that the UI displays the mocked data.
    // For example:
     cy.get('[data-cy="user-name"]').should('contain', 'Mocky McMockface');
     cy.get('[data-cy="user-email"]').should('contain', 'mocky.mcmockface@example.com');

    // For demonstration, we can assert on the interception object itself
    // to confirm that our mock data was used in the response.
    cy.get('@getUserProfile').its('response.body').should('have.property', 'firstName', 'Mocky');
  });
});