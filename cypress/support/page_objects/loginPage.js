class LoginPage {
  visit() {
    cy.visit("/");
  }

  enterUsername(username) {
    if (username) {
      cy.get('input[name="username"]').type(username);
    }
  }

  enterPassword(password) {
    if (password) {
      cy.get('input[name="password"]').type(password);
    }
  }

  clickLogin() {
    cy.get('input[value="Log In"]').click();
  }

  verifyErrorMessage() {
    cy.get(".error").should("be.visible");
  }

  verifyLoginSuccess() {

    cy.get('a[href*="logout.htm"]').should('be.visible');
    cy.url().should('include', '/overview.htm');
  }
}
export default new LoginPage();
