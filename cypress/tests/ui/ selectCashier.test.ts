describe("template spec", () => {
  it("should select a cashier", function () {
    cy.visit("/");
    cy.getBySel("select-cashier-list").click();
  });
});
