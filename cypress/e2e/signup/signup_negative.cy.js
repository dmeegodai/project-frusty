import registrationPage from '../../support/page_objects/registrationPage';

describe('Negative Sign Up Tests', () => {
  beforeEach(() => {
    // 1 Navigate from the home page to the registration page
    registrationPage.navigateTo();
  });

  it('should display an error for missing first name when registering with no data', () => {
    // 2. Validate the navigation for Sign up page
    registrationPage.verifyRegistrationPageHeader();
    // 3. Without entering any input values for fields just click Register button
    registrationPage.clickRegisterButton();
    // 4. Validate that Error triggered for missing field First name
    registrationPage.verifyFirstNameError();
  });
});