class ConfirmModal {
  get modal() {
    return cy.get('.modal-title');
  }

  get RemoveButton() {
    return cy.get('.btn-danger');
  }

  get cancelButton() {
    return cy.get('.btn-secondary');
  }

  confirm() {
    this.RemoveButton.click();
  }

  cancel() {
    this.cancelButton.click();
  }
}

export default new ConfirmModal();
