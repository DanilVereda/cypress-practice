class AddCarForm {
  get carBrandDropDownList() {
    return cy.get('#addCarBrand');
  }

  get carModelDropDownList() {
    return cy.get('#addCarModel');
  }

  get carMileageField() {
    return cy.get('#addCarMileage');
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

  get limitAlert() {
    return cy.get('.alert-danger');
  }

  selectBrand(brand) {
    this.carBrandDropDownList.select(brand);
  }

  selectModel(model) {
    this.carModelDropDownList.select(model);
  }

  typeMileage(mileage) {
    this.carMileageField.clear().type(mileage);
  }

  clickAdd() {
    this.addButton.click();
  }

  clickCancel() {
    this.cancelButton.click();
  }

  addCar({ brand, model, mileage }) {
    this.selectBrand(brand);
    this.selectModel(model);
    this.typeMileage(mileage);
    this.clickAdd();
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

export default new AddCarForm();
