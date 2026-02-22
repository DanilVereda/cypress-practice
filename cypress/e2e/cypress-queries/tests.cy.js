/// <reference types="cypress" />
beforeEach('Visit QAuto', () => {
  cy.visit('/');
});

describe('Find header elements', () => {
  it('Get logo', () => {
    cy.get('.header_logo');
  });

  it('Get Home button', () => {
    cy.get('.header_nav').children('a');
  });

  it('Get About button', () => {
    cy.get('[appscrollto="aboutSection"]');
  });

  it('Get Contacts button', () => {
    cy.get('[appscrollto="contactsSection"]');
  });

  it('Get Guest log in button', () => {
    cy.get('.header-link.-guest');
  });

  it('Get Sign in button', () => {
    cy.get('.header_signin');
  });
});

describe('Find footer elements', () => {
  it('Get Facebook icon', () => {
    cy.get('.socials_icon').first();
  });

  it('Get Facebook icon', () => {
    cy.get('.socials_icon').filter('.icon-telegram');
  });

  it('Get Youtube icon', () => {
    cy.get('.socials_icon').eq(2);
  });

  it('Get Instagram icon', () => {
    cy.get('.icon-instagram');
  });

  it('Get Linkedin icon', () => {
    cy.get('.socials_icon').last();
  });

  it('Get contact link', () => {
    cy.get('.contacts_link').first();
  });

  it('Get contact email', () => {
    cy.get('.contacts_link').last();
  });
});

describe('Find main elements', () => {
  it('Get H1', () => {
    cy.get('h1');
  });

  it('Get Sign up button', () => {
    cy.get('.btn-primary');
  });

  it('Get Youtube iframe', () => {
    cy.get('iframe');
  });
});
