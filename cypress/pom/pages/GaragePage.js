class GaragePage {
  get pageTitle() {
    return cy.contains('h1', 'Garage');
  }

  get addCarButton() {
    return cy.get('.panel-page_heading .btn-primary');
  }

  get carName() {
    return cy.get('.car_name');
  }

  get editCarButton() {
    return cy.get('.btn-edit');
  }

  get addFuelExpenseButton() {
    return cy.get('.car_add-expense');
  }

  get mileageField() {
    return cy.get('.update-mileage-form_input');
  }

  get updateMileageButton() {
    return cy.get('.update-mileage-form_submit');
  }

  get successAlert() {
    return cy.get('.alert-success');
  }

  get emptyGarageMessage() {
    return cy.get('.panel-empty_message');
  }

  enterNewMileage(mileage) {
    this.mileageField.clear().type(mileage);
  }

  openAddCarForm() {
    this.addCarButton.click();
  }

  openEditCarForm() {
    this.editCarButton.click();
  }

  openAddFuelExpensesForm() {
    this.addFuelExpenseButton.click();
  }

  updateMileage(mileage) {
    this.enterNewMileage(mileage);
    this.updateMileageButton.click();
  }
}

export default new GaragePage();
