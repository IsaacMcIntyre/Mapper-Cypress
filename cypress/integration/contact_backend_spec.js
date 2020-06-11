it(`Visits the backend to ensure connection.`, () => {
    // Cypress.config('baseUrl', null)
    cy.visit(`http://localhost:4523/health-check`);
    cy.contains('Health Check: Running');
});