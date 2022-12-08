import BasePage from "./base.page";
import ItemComponent from "./components/item.comp";

class SkincarePage extends BasePage {
  get itemComponent() {
    return ItemComponent;
  }
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

    await $("//span[text()='Cart']").click();
    await expect(browser).toHaveUrlContaining("checkout");
    let tempShippingRate = await $(
      "//span[text()='Flat Shipping Rate:']/../following-sibling::td"
    ).getText();
    let shippingRate = tempShippingRate.replace("$", "");

    itemsTotal = itemsTotal + parseFloat(shippingRate);
    console.log(`.................>>>>>>>>>>>>>>>>>>> ${itemsTotal}`);

    //extract total from cart
    let cartTotal = await (
      await $("//span[text()='Total:']/../following-sibling::td")
    ).getText();
    cartTotal = cartTotal.replace("$", "");
    await expect(itemsTotal).toEqual(parseFloat(cartTotal));
  }
}

export default new SkincarePage();
