class GaragePage {
  get pageTitle() {
    return cy.contains('h1', 'Garage');
  }

  get logoutButton() {
    return cy.get('.text-danger');
  }

  logout() {
    this.logoutButton.click();
  }
}

export default new GaragePage();
