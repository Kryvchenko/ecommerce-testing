import BasePage from "./base.page";

class LocatingElementsPage extends BasePage {
  get portfolioBtn() {
    return $("//a[@href='#portfolio']");
  }
  get webdriverioButton() {
    return $('[data-target="#portfolioModal1"]');
  }
  get tableHeaderTitles() {
    return $$("//table//th");
  }

  open() {
    return super.open("https://selectors.webdriveruniversity.com/");
  }
  async navigate() {
    await this.portfolioBtn.click();
    await this.webdriverioButton.click();
  }

  async getActualTitles() {
    const actualTitles = [];
    for (const title of await this.tableHeaderTitles) {
      actualTitles.push(await title.getText());
    }
    return actualTitles;
  }
}

export default new LocatingElementsPage();
