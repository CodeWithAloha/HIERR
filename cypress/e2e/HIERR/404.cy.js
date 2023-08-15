describe("Errors", () => {
  const url404test = "/theseAreNotTheDroidsYouAreLookingFor";
  it("404 'not found' response", () => {
    cy.request({
      url: url404test,
      followRedirect: true,
      failOnStatusCode: false,
    }).then((resp) => {
      expect(resp.status).to.eq(404);
      expect(resp.redirectedToUrl).to.eq(undefined);
    });
    cy.visit(url404test, { failOnStatusCode: false });
    cy.get("h1").should("contain", "404");
  });
});
