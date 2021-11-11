// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', () => {
  cy.visit('/login');
  cy.get('#email').type('bartosz@app.com');
  cy.get('#password').type('123{enter}');
  cy.contains('Logout');
});

Cypress.Commands.add('loginWithRequest', () => {
  cy.request({
    method: 'POST',
    url: Cypress.env('apiUrl') + '/auth/login',
    body: {
      email: 'bartosz@app.com',
      password: '123'
    }
  })
  .then(response => {
    window.localStorage.setItem('JWT_TOKEN', response.body.jwt);
  });

  cy.visit('/');
});

declare namespace Cypress {
  interface Chainable<Subject> {
    login(): void;
    loginWithRequest(): void;
  }
}
