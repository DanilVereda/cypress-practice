/// <reference types="cypress" />

import SignInForm from '../../pom/forms/SignInForm';
import HomePage from '../../pom/pages/HomePage';
import GaragePage from '../../pom/pages/GaragePage';
import Sidebar from '../../pom/components/Sidebar';
import ProfilePage from '../../pom/pages/ProfilePage';

describe('Intercept request', () => {
  beforeEach('Open QAuto and login', () => {
    HomePage.visit();
    HomePage.openSignInForm();
    SignInForm.login({ email: Cypress.env('user').email, password: Cypress.env('user').password });
  });

  it('Replace profile name', () => {
    let response = {
      status: 'ok',
      data: {
        userId: 335824,
        photoFilename: 'default-user.png',
        name: 'Polar',
        lastName: 'Bear',
      },
    };
    GaragePage.pageTitle.should('have.text', 'Garage');
    cy.intercept('GET', '/api/users/profile', response);
    Sidebar.navigateToProfilePage();
    ProfilePage.pageTitle.should('have.text', 'Profile');
    ProfilePage.profileNameText.should('have.text', 'Polar Bear');
  });
});
