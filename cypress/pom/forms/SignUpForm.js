class SignUpForm {
  get nameField() {
    return cy.get('#signupName');
  }

  get lastNameField() {
    return cy.get('#signupLastName');
  }

  get emailField() {
    return cy.get('#signupEmail');
  }

  get passwordField() {
    return cy.get('#signupPassword');
  }

  get reEnterPasswordField() {
    return cy.get('#signupRepeatPassword');
  }

  get signUpButton() {
    return cy.get('app-signup-modal .btn-primary');
  }

  get userExistErrorMessage() {
    return cy.get('.alert-danger');
  }

  get validationErrorMessage() {
    return cy.get('.invalid-feedback');
  }

  enterName(name) {
    this.nameField.type(name);
  }

  enterLastName(lastName) {
    this.lastNameField.type(lastName);
  }

  enterEmail(email) {
    this.emailField.type(email);
  }

  enterPassword(password) {
    this.passwordField.type(password);
  }

  enterReEnterPassword(reEnterPassword) {
    this.reEnterPasswordField.type(reEnterPassword);
  }

  signUp(name, lastName, email, password, reEnterPassword) {
    this.enterName(name);
    this.enterLastName(lastName);
    this.enterEmail(email);
    this.enterPassword(password);
    this.enterReEnterPassword(reEnterPassword);
    this.signUpButton.click();
  }

  triggerEmptyFieldValidation(field) {
    field.focus();
    field.blur();
  }

  triggerValidation(field, value) {
    field.type(value);
    field.blur();
  }
}

export default new SignUpForm();
