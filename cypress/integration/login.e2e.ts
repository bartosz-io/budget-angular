describe('Login page', () => {

  beforeEach(() => {
    cy.visit('/login');
  });

  it('greets with Login', () => {
    cy.contains('.header', 'Login to your account');
  });

  it('links to sign up page', () => {
    cy.contains('Sign up').click();

    cy.url().should('include', '/signup');
  });

  it('has login button disabled by default', () => {
    cy.contains('button', 'Login')
      .should('be.disabled');
  });

  it('logs in with valid credentials', () => {
    cy.get('#email').type('bartosz@app.com');
    cy.get('#password').type('123{enter}');

    cy.contains('Logout');
  });

  it('fails to login with invalid credentials', () => {
    cy.get('#email').type('bartosz@app.com');
    cy.get('#password').type('invalid{enter}');

    cy.contains('Login failed');
  });

})
