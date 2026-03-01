class HomePage {
  get signUnButton() {
    return cy.get('.btn-primary');
  }

  get signInButton() {
    return cy.get('.header_signin');
  }

  get pageHeader() {
    return cy.get('h1');
  }

  visit() {
    cy.visit('/');
  }

  openSignUpForm() {
    this.signUnButton.click();
  }

  openSignInForm() {
    this.signInButton.click();
  }
}

export default new HomePage();
