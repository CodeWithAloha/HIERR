describe("login", () => {
  it("user should be able to log in", () => {
    // Start from the index page
    cy.visit("/");

    // Find button with Sign in
    cy.get("button").contains("Sign in").click();

    // The new url should include "/about"
    cy.url().should("include", "/api/auth/signin");

    // Fill in the form
    cy.get('input[type="email"]').type("test@test.com");
    cy.get("button").contains("Sign in").click();

    // Check message
    cy.get("h1").contains("Check your email");
  });
});
