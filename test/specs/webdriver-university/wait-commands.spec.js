import waitCommandsPage from "../../pom/webdriver-university/wait-commands.page";

// this test was created to show a different wait methods available in Wbdriver I/O
// Than's why assertions wasn't implemented

describe("wait commands - examples", () => {
  beforeEach(async () => {
    await waitCommandsPage.open();
  });
  it("pause command", async () => {
    await waitCommandsPage.clickMe();
  });

  it("waitForClickable", async () => {
    //await clickMe_Button.waitForClickable({timeout: 3000});
    await waitCommandsPage.clickMe_Button.waitForClickable();
    await waitCommandsPage.clickMe_Button.click();
  });

  it("waitForDisplayed", async () => {
    await waitCommandsPage.clickMe_Button.waitForDisplayed();
  });

  it("waitForExist", async () => {
    await waitCommandsPage.clickMe_Button.waitForExist();
  });

  it("waitUntil", async () => {
    await browser.url("/Accordion/index.html");

    await waitCommandsPage.loadingStatus_UI.waitUntil(
      async function () {
        return (await this.getText()) === "LOADING COMPLETE.";
      },
      {
        timeout: 15000,
        timeoutMsg: "expected text to be different after 15 seconds."
      }
    );
  });
});
