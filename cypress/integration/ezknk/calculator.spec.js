import SellStayPage from "../../pages/SellStay.page";
/// <reference types="cypress" />
describe("Calculator", function () {
  before(() => {
    // ttp: Tests To Pass
    cy.fixture("ttp").then(function (data) {
      this.data = data;
    });
  });

  it("validate happy path", function () {
    const sellStayPage = new SellStayPage();
    sellStayPage.validateElements();
    // Iterate fixture file
    cy.wrap(this.data).each(function (tc) {
      sellStayPage.fillHomeValue(tc.homeValue);
      sellStayPage.fillMortgageBalanceValue(tc.mortgageBalance);
      sellStayPage.fillOtherLiensValue(tc.otherLiens);
      sellStayPage.submit();

      // Results
      sellStayPage
        .getMoneyImage()
        .should("have.attr", "src")
        .and("include", "/get-money-time.svg");

      sellStayPage
        .getResultTitle()
        .should("contain", "Estimated cash proceeds at closing");

      sellStayPage
        .getResultSubtitle()
        .should(
          "contain",
          "Fill out our application form for an assessment today."
        );

      sellStayPage
        .getStartApplicationButton()
        .should("have.attr", "href")
        .and("include", "/getoffer");

      sellStayPage
        .getResultAmount()
        .invoke("text")
        .then((text) => {
          // Removing characters [$ and ,]
          expect(parseInt(sellStayPage.clean(text))).equal(tc.expectedAmount);
        });

      sellStayPage
        .getResultHomeValue()
        .invoke("text")
        .then((text) => {
          expect(parseInt(sellStayPage.clean(text))).equal(
            tc.expectedHomeValue
          );
        });

      sellStayPage
        .getResultOptionValue()
        .invoke("text")
        .then((text) => {
          expect(parseInt(sellStayPage.clean(text))).equal(
            tc.expectedOptionValue
          );
        });
    });
    sellStayPage.getStartApplicationButton().click();
  });
});
