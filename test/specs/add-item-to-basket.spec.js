describe("Add items to the basket", () => {
  it("add specific 'skincare products' to the basket & validate cart total", async () => {
    await browser.url("https://automationteststore.com/");
    const skincareLinks = await $$("//a[contains(text(), 'Skincare')]");
    await skincareLinks[1].click();

    const skincareProducts_Header_Links = await $$(
      ".fixed_wrapper .prdocutname"
    );
    const itemPrices = [];
    let itemsTotal;

    for (const header of skincareProducts_Header_Links) {
      const tempHeaderText = await header.getText();

      if (
        tempHeaderText.toLowerCase() === "creme precieuse nuit 50ml" ||
        tempHeaderText.toLowerCase() === "total moisture facial cream"
      ) {
        const attr = await header.getAttribute("href");
        console.log(attr);
        // https://automationteststore.com/index.php?rt=product/product&path=43&product_id=66
        // https://automationteststore.com/index.php?rt=product/product&path=43&product_id=93

        const itemId = attr.split("id=").pop();
        await $(`//a[@data-id='${itemId}']`).click();

        // //a[@data-id='93']/following-sibling::div/div[@class='pricenew'] | //a[@data-id='66']/following-sibling::div/div[@class='oneprice']

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
    await browser.pause(5000);
  });
});
