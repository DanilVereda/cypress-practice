/// <reference types="cypress" />

import ConfirmModal from '../../pom/components/ConfirmModal';
import AddCarForm from '../../pom/forms/AddCarForm';
import EditCarForm from '../../pom/forms/EditCarForm';
import SignInForm from '../../pom/forms/SignInForm';
import GaragePage from '../../pom/pages/GaragePage';
import HomePage from '../../pom/pages/HomePage';
import { carsData } from '../../testData/cars';
import { GarageFlows } from '../../support/flows/garage.flows';

describe('Garage-management', () => {
  let sid;
  beforeEach('Visit QAuto', () => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login({ email: Cypress.env('user').email, password: Cypress.env('user').password });

    cy.request('POST', 'api/auth/signin', {
      email: Cypress.env('user').email,
      password: Cypress.env('user').password,
    }).then((response) => {
      cy.log(JSON.stringify(response.body));
      const headers = response.headers;
      sid = headers['set-cookie'][0].split(';')[0];
      cy.log(sid);
    });
  });

  context('Functional testing', () => {
    it('Add and delete a one car', () => {
      GaragePage.openAddCarForm();
      AddCarForm.addCar({
        brand: 'Audi',
        model: 'Q7',
        mileage: 14500,
      });
      GaragePage.carName.should('have.text', 'Audi Q7');
      cy.wait(3000);
      GaragePage.openEditCarForm();
      EditCarForm.clickRemoveCarButton();
      ConfirmModal.confirm();
      GaragePage.successAlert.should('have.text', 'Car removed');
    });

    it('Garage page without car', () => {
      GaragePage.emptyGarageMessage.should('have.text', 'You don’t have any cars in your garage');
    });
  });

  context.only('Add all cars (data-driven)', () => {
    let car_id;
    afterEach('Delete cars', () => {
      // GaragePage.openEditCarForm();
      // EditCarForm.clickRemoveCarButton();
      // ConfirmModal.confirm();

      // cy.request('GET', 'api/cars/').then((response) => {
      //   const cars = response.body.data;
      //   //   cy.log(JSON.stringify(cars));
      //   car_id = cars[0].id;
      // });

      // cy.request({
      //   method: 'DELETE',
      //   url: `api/cars/${car_id}`,
      //   headers: {
      //     Cookie: sid,
      //   },
      // }).then((response) => {
      //   expect(response.status).to.eq(200);
      // });

      cy.request({
        method: 'GET',
        url: 'api/cars',
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        const cars = response.body.data;
        car_id = cars[0].id;

        cy.request({
          method: 'DELETE',
          url: `api/cars/${car_id}`,
          headers: {
            Cookie: sid,
          },
        }).then((deleteResponse) => {
          expect(deleteResponse.status).to.eq(200);
        });
      });
    });
    Object.entries(carsData).forEach(([brand, models]) => {
      models.forEach((model) => {
        it(`Add ${brand} ${model}`, () => {
          GaragePage.openAddCarForm();

          AddCarForm.addCar({
            brand,
            model,
            mileage: 10000,
          });

          GaragePage.carName.last().should('have.text', `${brand} ${model}`);
          GaragePage.successAlert.should('have.text', 'Car added');
        });
      });
    });
  });

  context('Check limit for adding car', () => {
    it('car limit 25', () => {
      GarageFlows.addSameCarNTimes({ brand: 'BMW', model: 'X5', count: 25 });

      GaragePage.openAddCarForm();
      AddCarForm.addCar({ brand: 'BMW', model: 'X5', mileage: 99999 });

      AddCarForm.limitAlert.should('have.text', 'Cars limit reached');
      AddCarForm.clickCancel();
    });

    afterEach(() => {
      GarageFlows.deleteAllCars();
    });
  });

  context('Validation tests', () => {
    it('Empty mileage field', () => {
      GaragePage.openAddCarForm();
      AddCarForm.triggerEmptyFieldValidation(AddCarForm.carMileageField);
      AddCarForm.validationErrorMessage.should('have.text', 'Mileage cost required');
    });

    it('Mileage is less than 0', () => {
      GaragePage.openAddCarForm();
      AddCarForm.triggerValidation(AddCarForm.carMileageField, -1);
      AddCarForm.validationErrorMessage.should('have.text', 'Mileage has to be from 0 to 999999');
    });

    it('Mileage is more than 999999', () => {
      GaragePage.openAddCarForm();
      AddCarForm.triggerValidation(AddCarForm.carMileageField, 1000000);
      AddCarForm.validationErrorMessage.should('have.text', 'Mileage has to be from 0 to 999999');
    });
  });
});
