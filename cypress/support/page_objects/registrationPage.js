class RegistrationPage {
  navigateTo() {
    // 1. Navigate to base URL, then find and click the register link
    cy.visit('/');
    cy.get("a[href='register.htm']").should('be.visible').click();
  }

  visit() {
    cy.visit('/register.htm');
  }

  verifyRegistrationPageHeader() {
    cy.get('h1.title').should('have.text', 'Signing up is easy!');
  }

  clickRegisterButton() {
    // Using a more specific selector to target the register button in the form
    cy.get("input[value='Register']").click();
  }

  verifyFirstNameError() {
    cy.get("span[id='customer.firstName.errors']")
      .should('be.visible')
      .and('have.text', 'First name is required.');
  }
}

export default new RegistrationPage();