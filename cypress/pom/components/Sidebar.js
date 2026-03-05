class Sidebar {
  get garageButton() {
    return cy.get('.sidebar a[routerlink="garage"]');
  }

  get fuelExpensesButton() {
    return cy.get('.sidebar a[routerlink="expenses"]');
  }

  get instructionsButton() {
    return cy.get('.sidebar a[routerlink="instructions"]');
  }

  get profileButton() {
    return cy.get('.sidebar a[routerlink="profile"]');
  }

  get settingsButton() {
    return cy.get('.sidebar a[routerlink="settings"]');
  }

  get logoutButton() {
    return cy.get('.text-danger');
  }

  navigateToGaragePage() {
    this.garageButton.click();
  }

  navigateToFuelExpensesPage() {
    this.fuelExpensesButton.click();
  }

  navigateToInstructionsPage() {
    this.instructionsButton.click();
  }

  navigateToProfilePage() {
    this.profileButton.click();
  }

  navigateToSettingsPage() {
    this.settingsButton.click();
  }

  logout() {
    this.logoutButton.click();
  }
}

export default new Sidebar();
