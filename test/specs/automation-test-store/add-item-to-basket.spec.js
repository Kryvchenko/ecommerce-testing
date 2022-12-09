import HomePage from "../../pom/automation-test-store/home.page";
import SkincarePage from "../../pom/automation-test-store/skincare.page";
import CartPage from "../../pom/automation-test-store/cart.page";
describe("Add items to the basket", () => {
  it("add specific 'skincare products' to the basket & validate cart total", async () => {
    await HomePage.open();
    await HomePage.categoryMenuComponent
      .categoryMenuLink("Skincare")[1]
      .click();
    const itemsTotal = await SkincarePage.addSpecificItems_ValidateTotal(
      "creme precieuse nuit 50ml",
      "total moisture facial cream"
    );
    await CartPage.navigateThroughtHeader();
    const shippingRate = await CartPage.getShippingRate();
    const cartTotal = await CartPage.getTotalFromCart();
    await expect(itemsTotal + shippingRate).toEqual(parseFloat(cartTotal));
  });
});
