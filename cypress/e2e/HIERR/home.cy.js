describe("Navigation", () => {
  it("should navigate to the sign in page", () => {
    // Start from the index page
    cy.visit("/");

    // Find button with Sign in
    cy.get("button").contains("Sign in").click();

    // The new url should include "/about"
    cy.url().should("include", "/api/auth/signin");

    // The new page should contain an h1 with "About page"
    cy.get("button").contains("Sign in");
  });
});
