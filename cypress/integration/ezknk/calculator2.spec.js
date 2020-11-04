/// <reference types="cypress" />
describe("Calculator", function () {
  beforeEach(function () {
    cy.visit("/programs/sellstay");
    // ttp: Tests To Pass
    cy.fixture("ttp").then(function (ttp) {
      this.ttp = ttp;
    });
    // ttp: Tests To Fail
    cy.fixture("ttf").then(function (ttf) {
      this.ttf = ttf;
    });
    // invalidInputs: Should not enable Calculate button
    cy.fixture("invalidInputs").then(function (invalidInputs) {
      this.invalidInputs = invalidInputs;
    });
  });

  it("validate Test to Pass", function () {
    cy.get("div.calc-title > h2").scrollIntoView();
    cy.wrap(this.ttp).each(function (tc) {
      cy.get('input[name="homeValue"]')
        .clear() //Needs to be cleared out before sending keys
        .type(tc.homeValue);
      cy.get('input[name="mortgageBalance"]').clear().type(tc.mortgageBalance);
      cy.get('input[name="otherLiens"]').clear().type(tc.otherLiens);
      cy.get("button.calc-button").click();
      cy.get(".calc-result__amount")
        .invoke("text")
        .then((text) => {
          expect(parseInt(text.replace(/[$,]/g, ""))).equal(tc.expectedAmount);
        });
      cy.get("span + div > div.col-6.calc-result__table__value")
        .invoke("text")
        .then((text) => {
          expect(parseInt(text.replace(/[$,]/g, ""))).equal(
            tc.expectedHomeValue
          );
        });
      cy.get("div + div > div.col-6.calc-result__table__value")
        .invoke("text")
        .then((text) => {
          expect(parseInt(text.replace(/[$,]/g, ""))).equal(
            tc.expectedOptionValue
          );
        });
    });
  });

  it("validate Test to Fail", function () {
    cy.get("div.calc-title > h2").scrollIntoView();
    cy.wrap(this.ttf).each(function (tc) {
      cy.get('input[name="homeValue"]').clear().type(tc.homeValue);
      cy.get('input[name="mortgageBalance"]').clear().type(tc.mortgageBalance);
      cy.get('input[name="otherLiens"]').clear().type(tc.otherLiens);
      cy.get("button.calc-button").click();
      cy.get(".calc-result__error")
        .invoke("text")
        .then((text) => {
          expect(text).equal(
            "Based on your inputs for home value, mortgage balance, or other liens, you may not qualify for an EasyKnock product. Fill out the qualification form to see if you qualify today."
          );
        });
    });
  });

  it("validate Calculate button is disabled", function () {
    cy.get("div.calc-title > h2").scrollIntoView();
    cy.wrap(this.invalidInputs).each(function (tc) {
      cy.get('input[name="homeValue"]').clear().type(tc.homeValue);
      cy.get('input[name="mortgageBalance"]').clear().type(tc.mortgageBalance);
      cy.get('input[name="otherLiens"]').clear().type(tc.otherLiens);
      cy.get("button.calc-button").should(
        "have.class",
        "calc-button--disabled"
      );
    });
  });

  it.only("validate Calculate button is disabled after clearing the fields", function () {
    cy.get("div.calc-title > h2").scrollIntoView();
    cy.get('input[name="homeValue"]').clear().type(1);
    cy.get('input[name="mortgageBalance"]').clear().type(1);
    cy.get('input[name="otherLiens"]').clear().type(2);
    cy.get('input[name="otherLiens"]').clear();
    cy.get("button.calc-button").should("have.class", "calc-button--disabled");
  });
});
