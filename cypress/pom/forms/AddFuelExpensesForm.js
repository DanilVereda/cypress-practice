class AddFuelExpensesForm {
  get vehicleDropDownList() {
    return cy.get('#addExpenseCar');
  }

  get reportDateField() {
    return cy.get('#addExpenseDate');
  }

  get mileageField() {
    return cy.get('#addExpenseMileage');
  }

  get numberOfLitersField() {
    return cy.get('#addExpenseLiters');
  }

  get totalCostField() {
    return cy.get('#addExpenseTotalCost');
  }

  get cancelButton() {
    return cy.get('.modal-footer .btn-secondary');
  }

  get addButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  get validationErrorMessage() {
    return cy.get('.invalid-feedback');
  }

  selectVehicle(vehicleName) {
    this.vehicleDropDownList.select(vehicleName);
  }

  enterReportDate(date) {
    this.reportDateField.clear().type(date).blur();
  }

  enterMileage(mileage) {
    this.mileageField.clear().type(mileage);
  }

  enterLiters(liters) {
    this.numberOfLitersField.clear().type(liters);
  }

  enterTotalCost(cost) {
    this.totalCostField.clear().type(cost);
  }

  clickAdd() {
    this.addButton.click();
  }

  clickCancel() {
    this.cancelButton.click();
  }

  addFuelExpense({ vehicle, date, mileage, liters, totalCost }) {
    this.selectVehicle(vehicle);
    this.enterReportDate(date);
    this.enterMileage(mileage);
    this.enterLiters(liters);
    this.enterTotalCost(totalCost);
    this.clickAdd();
  }

  triggerEmptyFieldValidation(field) {
    field.clear();
    field.blur();
  }

  triggerValidation(field, value) {
    field.clear();
    field.type(value);
    field.blur();
  }
}

export default new AddFuelExpensesForm();
