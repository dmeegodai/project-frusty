import loginPage from "../../support/page_objects/loginPage";

describe("Positive Login Tests", () => {
  beforeEach(() => {
    loginPage.visit();
  });

  it("should allow a user to log in with valid credentials", () => {
    cy.task('log', 'starting postive login test');
    cy.fixture("users").then((user) => {
      cy.login(user.valid.username, user.valid.password);
      // Use the reusable verification method from the page object.
      // This method handles both the success case and the known server error.
      loginPage.verifyLoginSuccess();
    });
  });
});
