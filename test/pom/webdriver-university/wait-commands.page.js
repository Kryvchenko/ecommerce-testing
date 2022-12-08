import BasePage from "./base.page";

class WaitCommandsPage extends BasePage {
  get clickMe_Button() {
    return $("//*[text()='CLICK ME!']/..");
  }
  get clickMe_Button() {
    return $("#button1");
  }
  get loadingStatus_UI() {
    return $("#text-appear-box");
  }

  open() {
    return super.open("Ajax-Loader/index.html");
  }
  async clickMe() {
    await browser.waitThenClick(this.clickMe_Button);
  }
}

export default new WaitCommandsPage();
