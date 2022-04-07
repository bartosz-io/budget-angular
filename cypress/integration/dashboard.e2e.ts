describe("Dashboard page", () => {
  beforeEach(() => {
    cy.loginWithRequest();

    cy.visit("/app/dashboard");
  });

  it("has budget components", () => {
    cy.contains("Total budget");
    cy.contains("Budgets by category");
  });
});
