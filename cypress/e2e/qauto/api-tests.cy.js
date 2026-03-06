/// <reference types="cypress" />

describe('API request testing', () => {
  context('Auth tests', () => {
    let email = `testmail+${Date.now()}@gmail.com`;
    let sid;
    it('Sign up flow', () => {
      cy.request({
        url: 'api/auth/signup',
        method: 'POST',
        body: {
          name: 'John',
          lastName: 'Dou',
          email,
          password: 'Qwerty123',
          repeatPassword: 'Qwerty123',
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        expect(response.status).to.eq(201);
      });
    });

    it('Sign in flow', () => {
      cy.request({
        url: 'api/auth/signin',
        method: 'POST',
        body: {
          email,
          password: 'Qwerty123',
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        expect(response.status).to.eq(200);
        const headers = response.headers;
        sid = headers['set-cookie'][0].split(';')[0];
      });
    });

    it('Delete user', () => {
      cy.request({
        url: 'api/users',
        method: 'DELETE',
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        expect(response.status).to.eq(200);
      });
    });
  });

  context('Manage cars in the garage', () => {
    let sid;
    before(() => {
      cy.request('POST', 'api/auth/signin', {
        email: Cypress.env('user1').email,
        password: Cypress.env('user1').password,
      }).then((response) => {
        cy.log(JSON.stringify(response.body));
        const headers = response.headers;
        sid = headers['set-cookie'][0].split(';')[0];
        cy.log(sid);
      });
    });

    let car_id;

    it('Get list of users cars', () => {
      cy.request('GET', 'api/cars/').then((response) => {
        const cars = response.body.data;
        //   cy.log(JSON.stringify(cars));
        expect(cars).to.have.length(3);
        expect(cars[0].brand).to.equal('Porsche');
        expect(cars[0].model).to.equal('Cayenne');
      });
    });

    it('Add a car', () => {
      cy.request({
        url: 'api/cars',
        method: 'POST',
        body: {
          carBrandId: 3,
          carModelId: 12,
          mileage: 260550,
        },
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        const car = response.body.data;
        car_id = car.id;
        expect(response.status).to.eq(201);
        expect(response.body.data.carBrandId).to.eq(3);
        expect(response.body.data.carModelId).to.eq(12);
        expect(response.body.data.mileage).to.eq(260550);
        expect(response.body.data.brand).to.eq('Ford');
        expect(response.body.data.model).to.eq('Focus');
      });
    });

    it('Edit a car', () => {
      cy.request({
        url: `api/cars/${car_id}`,
        method: 'PUT',
        body: {
          carBrandId: 3,
          carModelId: 13,
          mileage: 280550,
        },
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        const car = response.body.data;
        car_id = car.id;
        expect(response.status).to.eq(200);
        expect(response.body.data.carBrandId).to.eq(3);
        expect(response.body.data.carModelId).to.eq(13);
        expect(response.body.data.mileage).to.eq(280550);
        expect(response.body.data.brand).to.eq('Ford');
        expect(response.body.data.model).to.eq('Fusion');
      });
    });

    it('Delete a car', () => {
      cy.request({
        method: 'DELETE',
        url: `api/cars/${car_id}`,
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  context('Manage Fuel expenses', () => {
    let sid;
    let car_id;
    let expense_id;
    before(() => {
      cy.request('POST', 'api/auth/signin', {
        email: Cypress.env('user1').email,
        password: Cypress.env('user1').password,
      }).then((response) => {
        cy.log(JSON.stringify(response.body));
        const headers = response.headers;
        sid = headers['set-cookie'][0].split(';')[0];
        cy.log(sid);
      });

      cy.request('GET', 'api/cars/').then((response) => {
        const cars = response.body.data;
        car_id = cars[0].id;
        cy.log(car_id);
      });
    });

    it('Add an expense', () => {
      cy.request({
        url: 'api/expenses',
        method: 'POST',
        body: {
          carId: car_id,
          reportedAt: '2026-03-05',
          mileage: 300000,
          liters: 30,
          totalCost: 1500,
          forceMileage: false,
        },
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        const expense = response.body.data;
        expense_id = expense.id;
        expect(response.status).to.eq(200);
        expect(expense.carId).to.eq(car_id);
        expect(expense.mileage).to.eq(300000);
        expect(expense.liters).to.eq(30);
        expect(expense.totalCost).to.eq(1500);
      });
    });

    it('Edit an expense', () => {
      cy.request({
        url: `api/expenses/${expense_id}`,
        method: 'PUT',
        body: {
          carId: car_id,
          reportedAt: '2026-03-05',
          mileage: 350000,
          liters: 40,
          totalCost: 1800,
          forceMileage: false,
        },
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        cy.log(`status: ${response.status}`);
        cy.log(JSON.stringify(response.body, null, 2));
        const expense = response.body.data;
        expect(response.status).to.eq(200);
        expect(expense.carId).to.eq(car_id);
        expect(expense.mileage).to.eq(350000);
        expect(expense.liters).to.eq(40);
        expect(expense.totalCost).to.eq(1800);
      });
    });

    it('Delete an expense', () => {
      cy.request({
        method: 'DELETE',
        url: `api/expenses/${expense_id}`,
        headers: {
          Cookie: sid,
        },
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});
