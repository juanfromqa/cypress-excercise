class SellStayPage {
  getTitle() {
    return cy.get("div.calc-title > h2").scrollIntoView();
  }

  getSubtitle() {
    return cy.get("div.calc-title p");
  }

  getHomeValueLabel() {
    // Validating if xpath is easy to implement with Cypress. It is :D 
    return cy.xpath(
      '//*[@id="__next"]/div/main/div[6]/section/div/div[1]/div[1]/div[2]/div[1]/div[1]/div/label'
    );
  }

  getMortgageBalanceLabel() {
    return cy.xpath(
      '//*[@id="__next"]/div/main/div[6]/section/div/div[1]/div[1]/div[2]/div[1]/div[2]/div/label'
    );
  }

  getOtherLiensLabel() {
    return cy.xpath(
      '//*[@id="__next"]/div/main/div[6]/section/div/div[1]/div[1]/div[2]/div[2]/div[1]/div/label'
    );
  }

  getTooltip() {
    return cy.get("label > div.calc-icon");
  }

  getModal() {
    return cy.get("div.calc-modal__box");
  }

  getHomeInput() {
    return cy.get('input[name="homeValue"]');
  }

  getMortgageBalanceInput() {
    return cy.get('input[name="mortgageBalance"]');
  }

  getOtherLiensInput() {
    return cy.get('input[name="otherLiens"]');
  }

  // RESULTS SECTION
  getMoneyImage() {
    return cy.get('.calc-result__image');
  }

  getResultTitle() {
    return cy.get("div.calc-result > span.calc-result__title");
  }

  getResultSubtitle() {
    return cy.get("span.calc-result__sub2");
  }

  getStartApplicationButton() {
    return cy.get("a.btn.calc-result__button", {waitForAnimations: false});
  }

  getResultAmount() {
    return cy.xpath(
      '//*[@id="__next"]/div/main/div[6]/section/div/div[1]/div[2]/div/div/div/span[2]/text()[2]'
    );
  }

  getResultHomeValue() {
      return cy.get('span + div > div.col-6.calc-result__table__value');
  }

  getResultOptionValue() {
    return cy.get('div + div > div.col-6.calc-result__table__value');
  }

  getError() {
    return cy.get("span.calc-result__error");
  }

  getTerms(){
      return cy.get('span.calc-terms');
  }

  fillHomeValue(value) {
    cy.get('input[name="homeValue"]').clear().type(value);
    return this;
  }

  fillMortgageBalanceValue(value) {
    cy.get('input[name="mortgageBalance"]').clear().type(value);
    return this;
  }

  fillOtherLiensValue(value) {
    cy.get('input[name="otherLiens"]').clear().type(value);

    return this;
  }

  submit() {
    const button = cy.get("button.calc-button");
    button.click();
  }

  validateElements() {
    cy.visit("/programs/sellstay");
    this.getTitle().should("be.visible");
    this.getSubtitle().should("be.visible");
    this.getHomeValueLabel().should("be.visible");
    this.getMortgageBalanceLabel().should("be.visible");
    this.getOtherLiensLabel().should("be.visible");
  }

  clean(text){
      return text.replace(/[$,]/g, "");
  }
  
}

export default SellStayPage;
