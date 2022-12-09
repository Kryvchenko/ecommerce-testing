import HeaderComponent from "./components/header.comp";
class CartPage {
  get shippingRate() {
    return $("//span[text()='Flat Shipping Rate:']/../following-sibling::td");
  }
  get cartTotalElement() {
    return $("//span[text()='Total:']/../following-sibling::td");
  }

  async navigateThroughtHeader() {
    const headerLink = await HeaderComponent.headerLinks("Cart");
    return headerLink.click();
  }
  async getShippingRate() {
    let tempShippingRate = await this.shippingRate.getText();
    let shippingRate = tempShippingRate.replace("$", "");
    return parseFloat(shippingRate);
  }
  async getTotalFromCart() {
    let cartTotal = await this.cartTotalElement.getText();
    cartTotal = cartTotal.replace("$", "");
    return cartTotal;
  }
}
export default new CartPage();
