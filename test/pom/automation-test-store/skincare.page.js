import BasePage from "./base.page";
import ItemComponent from "./components/item.comp";

class SkincarePage extends BasePage {
  async addSpecificItems_ValidateTotal(item1, item2) {
    const skincareProducts_Header_Links = await ItemComponent.itemHeaderLinks;
    const itemPrices = [];
    let itemsTotal;
    for (const header of skincareProducts_Header_Links) {
      const tempHeaderText = await header.getText();
      if (
        tempHeaderText.toLowerCase() === item1.toLowerCase() ||
        tempHeaderText.toLowerCase() === item2.toLowerCase()
      ) {
        const attr = await header.getAttribute("href");
        const itemId = attr.split("id=").pop();
        await $(`//a[@data-id='${itemId}']`).click();
        itemPrices.push(
          await $(
            `//a[@data-id='${itemId}']/following-sibling::div/div[@class='pricenew'] | //a[@data-id='${itemId}']/following-sibling::div/div[@class='oneprice']`
          ).getText()
        );
      }
      const formattedItemPrices = [];
      itemPrices.forEach((price) =>
        formattedItemPrices.push(price.replace("$", ""))
      );
      itemsTotal = 0;
      formattedItemPrices.forEach((price) => (itemsTotal += parseFloat(price)));
    }
    return itemsTotal;
  }
}

export default new SkincarePage();
