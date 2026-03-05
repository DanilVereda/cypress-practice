class FuelExpenses {
  get pageTitle() {
    return cy.contains('h1', 'Fuel expenses');
  }

  get vehicleDropDownList() {
    return cy.get('#carSelectDropdown');
  }

  get addExpensesButton() {
    return cy.get('.panel-page_heading .btn-primary');
  }

  get expensesTable() {
    return cy.get('.expenses_table');
  }

  get tableRows() {
    return this.expensesTable.find('tbody tr');
  }

  get emptyFuelExpensesMessage() {
    return cy.get('.panel-empty_message');
  }

  get yourGarageButton() {
    return cy.get('.h3 a[routerlink="/panel/garage"]');
  }

  getRow(index) {
    return this.tableRows.eq(index);
  }

  getRowCells(index) {
    return this.getRow(index).find('td');
  }

  verifyExpenseRow(index, { date, mileage, liters, totalCost }) {
    this.getRow(index).within(() => {
      cy.get('td').eq(0).should('have.text', date);
      cy.get('td').eq(1).should('have.text', mileage);
      cy.get('td').eq(2).should('have.text', liters);
      cy.get('td').eq(3).should('have.text', totalCost);
    });
  }

  clickYourGarageButton() {
    this.yourGarageButton.click();
  }

  openAddExpensesForm() {
    this.addExpensesButton.click();
  }
}

export default new FuelExpenses();
