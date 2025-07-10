// This file is for setting up global intercepts that
// should apply to all e2e tests.

beforeEach(() => {
  // Example: Block all requests to Google Analytics to prevent
  // test data from polluting your analytics.
  cy.intercept('https://www.google-analytics.com/**', { statusCode: 204 }).as('googleAnalytics');
});