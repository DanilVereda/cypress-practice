class Header {
  get logoButton() {
    return cy.get('.header_logo');
  }

  get garageButton() {
    return cy.get('.header_nav a[routerlink="/panel/garage"]');
  }

  get fuelExpensesButton() {
    return cy.get('.header_nav a[routerlink="/panel/expenses"]');
  }

  get instructionsButton() {
    return cy.get('.header_nav a[routerlink="/panel/instructions"]');
  }

  get myProfileButton() {
    return cy.get('#userNavDropdown');
  }
}

export default new Header();
