/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm';
import SignUpForm from '../../pom/forms/SignUpForm';
import GaragePage from '../../pom/pages/GaragePage';
import HomePage from '../../pom/pages/HomePage';

describe('Sign-up form', () => {
  beforeEach('Visit QAuto', () => {
    HomePage.visit();
    HomePage.openSignUpForm();
  });

  context('Functional tests', () => {
    it('Success sign up', () => {
      SignUpForm.signUp(
        'Anatoliy',
        'Ivanov',
        `testmail+${Date.now()}@gmail.com`,
        'Qwerty123',
        'Qwerty123',
      );
      GaragePage.pageTitle.should('have.text', 'Garage');
    });

    it('Sign up with exist email', () => {
      SignUpForm.signUp('Anatoliy', 'Ivanov', 'test1703@gmail.com', 'Qwerty123', 'Qwerty123');
      SignUpForm.userExistErrorMessage.should('have.text', 'User already exists');
    });

    it('Success sign up, log out and sign in', () => {
      let email = `testmail+${Date.now()}@gmail.com`;
      SignUpForm.signUp('Anatoliy', 'Ivanov', email, 'Qwerty123', 'Qwerty123');
      GaragePage.pageTitle.should('have.text', 'Garage');
      GaragePage.logout();
      HomePage.pageHeader.should('have.text', 'Do more!');
      HomePage.openSignInForm();
      SignInForm.login(email, 'Qwerty123');
      GaragePage.pageTitle.should('have.text', 'Garage');
    });
  });

  context('Validation tests', () => {
    context('Name field', () => {
      it('Empty Name field', () => {
        SignUpForm.triggerEmptyFieldValidation(SignUpForm.nameField);
        SignUpForm.validationErrorMessage.should('have.text', 'Name is required');
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is less than 2 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'A');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Name has to be from 2 to 20 characters long',
        );
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is more than 20 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'AnatoliyTrubinGoalKeeper');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Name has to be from 2 to 20 characters long',
        );
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name is non-latin symbol', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'Анна');
        SignUpForm.validationErrorMessage.should('have.text', 'Name is invalid');
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with numbers', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'Anna234');
        SignUpForm.validationErrorMessage.should('have.text', 'Name is invalid');
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with special symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'Anna!"№;%:?*');
        SignUpForm.validationErrorMessage.should('have.text', 'Name is invalid');
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name with only spaces', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, '    ');
        SignUpForm.validationErrorMessage.should('have.text', 'Name is invalid');
        SignUpForm.nameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Name consisting with two words', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'Lily-Grace');
        SignUpForm.validationErrorMessage.should('not.exist');
      });

      it('Check trim function for Name field', () => {
        SignUpForm.triggerValidation(SignUpForm.nameField, 'David   ');
        SignUpForm.validationErrorMessage.should('not.exist');
        SignUpForm.nameField.should('have.value', 'David');
      });
    });

    context('Last name field', () => {
      it('Empty Last name field', () => {
        SignUpForm.triggerEmptyFieldValidation(SignUpForm.lastNameField);
        SignUpForm.validationErrorMessage.should('have.text', 'Last name is required');
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is less than 2 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'A');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Last name has to be from 2 to 20 characters long',
        );
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is more than 20 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'AnatoliyTrubinGoalKeeper');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Last name has to be from 2 to 20 characters long',
        );
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name is non-latin symbol', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'Анна');
        SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with numbers', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'Anna2345');
        SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with special symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'Anna!"№;%:?*');
        SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name with only spaces', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, '    ');
        SignUpForm.validationErrorMessage.should('have.text', 'Last name is invalid');
        SignUpForm.lastNameField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Last name consisting with two words', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'Smith-Jones');
        SignUpForm.validationErrorMessage.should('not.exist');
      });

      it('Check trim function for Last name field', () => {
        SignUpForm.triggerValidation(SignUpForm.lastNameField, 'Smith   ');
        SignUpForm.validationErrorMessage.should('not.exist');
        SignUpForm.lastNameField.should('have.value', 'Smith');
      });
    });

    context('Email field', () => {
      it('Empty email', () => {
        SignUpForm.triggerEmptyFieldValidation(SignUpForm.emailField);
        SignUpForm.validationErrorMessage.should('have.text', 'Email required');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without @', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, 'testgmail.com');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without post service part', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, 'test@gmail.');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without dot', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, 'test@gmailcom');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without domain part', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, 'test@.com');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email without username part', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, '@gmail.com');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Email with only spaces', () => {
        SignUpForm.triggerValidation(SignUpForm.emailField, '    ');
        SignUpForm.validationErrorMessage.should('have.text', 'Email is incorrect');
        SignUpForm.emailField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    context('Password field', () => {
      it('Empty password', () => {
        SignUpForm.triggerEmptyFieldValidation(SignUpForm.passwordField);
        SignUpForm.validationErrorMessage.should('have.text', 'Password required');
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password is less than 8 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'Qwerty1');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password is more than 15 symbols', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'Qwerty123Qwerty123');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without integer', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'Qwertyqwe');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without small letter', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'QWERTY123');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password without capital letter', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'qwerty123');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Password with only spaces', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, '    ');
        SignUpForm.validationErrorMessage.should(
          'have.text',
          'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
        );
        SignUpForm.passwordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });

    context('Re-enter password field', () => {
      beforeEach('Enter a valid password', () => {
        SignUpForm.triggerValidation(SignUpForm.passwordField, 'Qwerty123');
      });

      it('Empty re-enter password', () => {
        SignUpForm.triggerEmptyFieldValidation(SignUpForm.reEnterPasswordField);
        SignUpForm.validationErrorMessage.should('have.text', 'Re-enter password required');
        SignUpForm.reEnterPasswordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });

      it('Re-enter password do not match', () => {
        SignUpForm.triggerValidation(SignUpForm.reEnterPasswordField, 'Qwerty1234');
        SignUpForm.validationErrorMessage.should('have.text', 'Passwords do not match');
        SignUpForm.reEnterPasswordField.should('have.css', 'border-color', 'rgb(220, 53, 69)');
      });
    });
  });
});
