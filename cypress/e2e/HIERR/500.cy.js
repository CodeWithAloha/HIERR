context("Errors", () => {
  const errorMsg = "Oops! Try again later";
  it("simulates a server error", () => {
    cy.intercept("GET", "/test500", {
      statusCode: 500,
      failOnStatusCode: false,
    }).as("getServerFailure");

    cy.request({ url: "/test500", failOnStatusCode: false });
  });
});
