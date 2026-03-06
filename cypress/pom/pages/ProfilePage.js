class ProfilePage {
  get pageTitle() {
    return cy.contains('h1', 'Profile');
  }

  get editProfileButton() {
    return cy.get('.panel-page_heading .btn-primary');
  }

  get profileNameText() {
    return cy.get('.profile_name');
  }
}

export default new ProfilePage();
