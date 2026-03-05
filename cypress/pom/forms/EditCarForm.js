class EditCarForm {
  get carBrandDropDownList() {
    return cy.get('#addCarBrand');
  }

  get carModelDropDownList() {
    return cy.get('#addCarModel');
  }

  get carMileageField() {
    return cy.get('#addCarMileage');
  }

  get createdDate() {
    return cy.get('#carCreationDate');
  }

  get removeCarButton() {
    return cy.get('.btn-outline-danger');
  }

  get cancelButton() {
    return cy.get('.modal-footer .btn-secondary');
  }

  get saveButton() {
    return cy.get('.modal-footer .btn-primary');
  }

  clickSaveButton() {
    this.saveButton.click();
  }

  clickCancelButton() {
    this.cancelButton.click();
  }

  clickRemoveCarButton() {
    this.removeCarButton.click();
  }
}

export default new EditCarForm();
