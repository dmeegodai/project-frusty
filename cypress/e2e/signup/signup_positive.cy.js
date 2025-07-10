import registrationPage from '../../support/page_objects/registrationPage';

describe('Positive Sign Up Tests', () => {
  beforeEach(() => {
    // Navigate from the home page to the registration page
    registrationPage.navigateTo();
  });
});