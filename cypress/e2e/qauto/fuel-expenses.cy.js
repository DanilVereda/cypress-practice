/// <reference types="cypress" />

import ConfirmModal from '../../pom/components/ConfirmModal';
import Sidebar from '../../pom/components/Sidebar';
import AddCarForm from '../../pom/forms/AddCarForm';
import AddFuelExpensesForm from '../../pom/forms/AddFuelExpensesForm';
import EditCarForm from '../../pom/forms/EditCarForm';
import SignInForm from '../../pom/forms/SignInForm';
import FuelExpenses from '../../pom/pages/FuelExpenses';
import GaragePage from '../../pom/pages/GaragePage';
import HomePage from '../../pom/pages/HomePage';

describe('Fuel-expenses management', () => {
  beforeEach('Visit QAuto', () => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login({ email: Cypress.env('user').email, password: Cypress.env('user').password });
  });

  context('Functionality test', () => {
    it('Fuel-expenses page without data', () => {
      Sidebar.navigateToFuelExpensesPage();
      FuelExpenses.pageTitle.should('have.text', 'Fuel expenses');
      FuelExpenses.emptyFuelExpensesMessage.should(
        'have.text',
        'You don’t have any cars in your garage',
      );
      FuelExpenses.addExpensesButton.should('be.disabled');
      FuelExpenses.clickYourGarageButton();
      GaragePage.pageTitle.should('have.text', 'Garage');
    });

    it('Add car and fuel-expenses for this car', () => {
      let mileage = 27000;
      GaragePage.openAddCarForm();
      AddCarForm.addCar({
        brand: 'Porsche',
        model: '911',
        mileage: mileage,
      });
      GaragePage.carName.should('have.text', 'Porsche 911');
      Sidebar.navigateToFuelExpensesPage();
      FuelExpenses.openAddExpensesForm();
      AddFuelExpensesForm.addFuelExpense({
        vehicle: 'Porsche 911',
        date: '04.03.2026',
        mileage: mileage + 10,
        liters: 10,
        totalCost: 150,
      });
      FuelExpenses.verifyExpenseRow(0, {
        date: '04.03.2026',
        mileage: mileage + 10,
        liters: '10L',
        totalCost: '150.00 USD',
      });
      Sidebar.navigateToGaragePage();
      GaragePage.openEditCarForm();
      EditCarForm.clickRemoveCarButton();
      ConfirmModal.confirm();
    });
  });

  context('Validation tests', () => {
    beforeEach('Add car', () => {
      GaragePage.openAddCarForm();
      AddCarForm.addCar({
        brand: 'Audi',
        model: 'A6',
        mileage: 15000,
      });
      Sidebar.navigateToFuelExpensesPage();
      FuelExpenses.openAddExpensesForm();
    });

    afterEach('Delete car', () => {
      AddFuelExpensesForm.clickCancel();
      Sidebar.navigateToGaragePage();
      GaragePage.openEditCarForm();
      EditCarForm.clickRemoveCarButton();
      ConfirmModal.confirm();
    });

    it('Empty mileage field', () => {
      AddFuelExpensesForm.triggerEmptyFieldValidation(AddFuelExpensesForm.mileageField);
      AddFuelExpensesForm.validationErrorMessage.should('have.text', 'Mileage required');
    });

    it('Mileage is less than 0', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.mileageField, -1);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Mileage has to be from 0 to 999999',
      );
    });

    it('Mileage is more than 999999', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.mileageField, 1000000);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Mileage has to be from 0 to 999999',
      );
    });

    it('Empty numbers of liters field', () => {
      AddFuelExpensesForm.triggerEmptyFieldValidation(AddFuelExpensesForm.numberOfLitersField);
      AddFuelExpensesForm.validationErrorMessage.should('have.text', 'Liters required');
    });

    it('Numbers of liters is less than 0', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.numberOfLitersField, -0.01);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Liters has to be from 0.01 to 9999',
      );
    });

    it('Numbers of liters is more than 9999', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.numberOfLitersField, 10000);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Liters has to be from 0.01 to 9999',
      );
    });

    it('Empty total cost field', () => {
      AddFuelExpensesForm.triggerEmptyFieldValidation(AddFuelExpensesForm.totalCostField);
      AddFuelExpensesForm.validationErrorMessage.should('have.text', 'Total cost required');
    });

    it('Total cost is less than 0', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.totalCostField, -0.01);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Total cost has to be from 0.01 to 1000000',
      );
    });

    it('Total cost is more than 1000000', () => {
      AddFuelExpensesForm.triggerValidation(AddFuelExpensesForm.totalCostField, 1000001);
      AddFuelExpensesForm.validationErrorMessage.should(
        'have.text',
        'Total cost has to be from 0.01 to 1000000',
      );
    });
  });
});
