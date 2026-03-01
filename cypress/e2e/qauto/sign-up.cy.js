/// <reference types="cypress" />

describe('Sign-up form', () => {
  beforeEach('Visit QAuto', () => {
    cy.visit('/');
    cy.get('.btn-primary').click();
  });

  context('Functional tests', () => {
    it('Success sign up', () => {
      cy.get('#signupName').type('Anatoliy');
      cy.get('#signupLastName').type('Ivanov');
      cy.get('#signupEmail').type(`testmail+${Date.now()}@gmail.com`);
      cy.get('#signupPassword').type('Qwerty123');
      cy.get('#signupRepeatPassword').type('Qwerty123');
      cy.get('app-signup-modal .btn-primary').click();
      cy.get('h1').should('have.text', 'Garage');
    });

    it('Sign up with exist email', () => {
      cy.get('#signupName').type('Anatoliy');
      cy.get('#signupLastName').type('Ivanov');
      cy.get('#signupEmail').type(`test1703@gmail.com`);
      cy.get('#signupPassword').type('Qwerty123');
      cy.get('#signupRepeatPassword').type('Qwerty123');
      cy.get('app-signup-modal .btn-primary').click();
      cy.get('.alert-danger').should('have.text', 'User already exists');
    });

    it('Success sign up, log out and sign in', () => {
      let email = `testmail+${Date.now()}@gmail.com`;
      cy.get('#signupName').type('Anatoliy');
      cy.get('#signupLastName').type('Ivanov');
      cy.get('#signupEmail').type(email);
      cy.get('#signupPassword').type('Qwerty123');
      cy.get('#signupRepeatPassword').type('Qwerty123');
      cy.get('app-signup-modal .btn-primary').click();
      cy.get('h1').should('have.text', 'Garage');
      cy.get('.text-danger').click();
      cy.get('h1').should('have.text', 'Do more!');
      cy.get('.header_signin').click();
      cy.get('#signinEmail').type(email);
      cy.get('#signinPassword').type('Qwerty123');
      cy.get('.modal-content .btn-primary').click();
      cy.get('h1').should('have.text', 'Garage');
    });
  });

  context('Validation tests', () => {
    context('Name field', () => {
      it('Empty Name field', () => {
        cy.get('#signupName').focus();
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Name is required');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is less than 2 symbols', () => {
        cy.get('#signupName').type('A');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Name has to be from 2 to 20 characters long',
        );
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is more than 20 symbols', () => {
        cy.get('#signupName').type('AnatoliyTrubinGoalKeeper');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Name has to be from 2 to 20 characters long',
        );
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is non-latin symbol', () => {
        cy.get('#signupName').type('Анна');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with numbers', () => {
        cy.get('#signupName').type('Anna234');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with special symbols', () => {
        cy.get('#signupName').type('Anna!"№;%:?*');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with only spaces', () => {
        cy.get('#signupName').type('    ');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Name is invalid');
        cy.get('#signupName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name consisting with two words', () => {
        cy.get('#signupName').type('Lily-Grace');
        cy.get('#signupName').blur();
        cy.get('.invalid-feedback').should('not.exist');
      });

      it('Check trim function for Name field', () => {
        cy.get('#signupName').type('David   ');
        cy.get('#signupName').blur();
        cy.get('#signupName').should('have.value', 'David');
        cy.get('.invalid-feedback').should('not.exist');
      });
    });

    context('Last name field', () => {
      it('Empty Last name field', () => {
        cy.get('#signupLastName').focus();
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Last name is required');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is less than 2 symbols', () => {
        cy.get('#signupLastName').type('A');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Last name has to be from 2 to 20 characters long',
        );
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is more than 20 symbols', () => {
        cy.get('#signupLastName').type('AnatoliyTrubinGoalKeeper');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Last name has to be from 2 to 20 characters long',
        );
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is non-latin symbol', () => {
        cy.get('#signupLastName').type('Анна');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with numbers', () => {
        cy.get('#signupLastName').type('Anna2345');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with special symbols', () => {
        cy.get('#signupLastName').type('Anna!"№;%:?*');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with only spaces', () => {
        cy.get('#signupLastName').type('    ');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('have.text', 'Last name is invalid');
        cy.get('#signupLastName').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name consisting with two words', () => {
        cy.get('#signupLastName').type('Smith-Jones');
        cy.get('#signupLastName').blur();
        cy.get('.invalid-feedback').should('not.exist');
      });

      it('Check trim function for Last name field', () => {
        cy.get('#signupLastName').type('Smith   ');
        cy.get('#signupLastName').blur();
        cy.get('#signupLastName').should('have.value', 'Smith');
        cy.get('.invalid-feedback').should('not.exist');
      });
    });

    context('Email field', () => {
      it('Empty email', () => {
        cy.get('#signupEmail').focus();
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email required');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without @', () => {
        cy.get('#signupEmail').type('testgmail.com');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without post service part', () => {
        cy.get('#signupEmail').type('test@gmail.');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without dot', () => {
        cy.get('#signupEmail').type('test@gmailcom');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without domain part', () => {
        cy.get('#signupEmail').type('test@.com');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without username part', () => {
        cy.get('#signupEmail').type('@gmail.com');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email with only spaces', () => {
        cy.get('#signupEmail').type('    ');
        cy.get('#signupEmail').blur();
        cy.get('.invalid-feedback').should('have.text', 'Email is incorrect');
        cy.get('#signupEmail').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    context('Password field', () => {
      it('Empty password', () => {
        cy.get('#signupPassword').focus();
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should('have.text', 'Password required');
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password is less than 8 symbols', () => {
        cy.get('#signupPassword').type('Qwerty1');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password is more than 15 symbols', () => {
        cy.get('#signupPassword').type('Qwerty123Qwerty123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without integer', () => {
        cy.get('#signupPassword').type('Qwertyqwe');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without small letter', () => {
        cy.get('#signupPassword').type('QWERTY123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without capital letter', () => {
        cy.get('#signupPassword').type('qwerty123');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password with only spaces', () => {
        cy.get('#signupPassword').type('    ');
        cy.get('#signupPassword').blur();
        cy.get('.invalid-feedback').should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        cy.get('#signupPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    context('Re-enter password field', () => {
      beforeEach('Enter a valid password', () => {
        cy.get('#signupPassword').type('Qwerty123');
        cy.get('#signupPassword').blur();
      });

      it('Empty re-enter password', () => {
        cy.get('#signupRepeatPassword').focus();
        cy.get('#signupRepeatPassword').blur();
        cy.get('.invalid-feedback').should('have.text', 'Re-enter password required');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Re-enter password do not match', () => {
        cy.get('#signupRepeatPassword').type('Qwerty1234');
        cy.get('#signupRepeatPassword').blur();
        cy.get('.invalid-feedback').should('have.text', 'Passwords do not match');
        cy.get('#signupRepeatPassword').should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });
  });
});
