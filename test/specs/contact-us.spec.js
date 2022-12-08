// import allureReporter from "@wdio/allure-reporter";
import ContactUsPage from "../pom/webdriver-university/contact-us.page";

//to use this.retries you have function keyword for describe block, because arrow function this is equal to outer scope
describe("webdriveruniversity - contact us page", function () {
  //this.retries(1); //Retries all tests in suite 1 time
  beforeEach(async () => {
    await ContactUsPage.open();
    console.log(`>>Browser Object: ${JSON.stringify(browser)}`);
  });

  it("valid submission - submit all information", async () => {
    //allureReporter.addFeature("Contact us Page - valid Submission");
    // allureReporter.addDescription(
    //   "Validate contact us page by submitting all data"
    // );
    // allureReporter.addSeverity("critical");

    await ContactUsPage.submitForm(
      "Joe",
      "Blogs",
      "joe_blogs123@mail.com",
      "Hello how are you?"
    );

    //await browser.debug();  //use it to debug your code after specific line in the code

    await expect(ContactUsPage.successfulSubmissionHeader).toHaveText(
      "Thank You for your Message!"
    );

    //Jest Assertion:
    //const successfulSubmissionHeader2 = await $('#contact_reply > h1').getText();
    //expect(successfulSubmissionHeader2).toEqual('Thank You for your Message!555');
  });

  it("invalid submission - dont submit all information", async () => {
    await ContactUsPage.submitForm("Sarah", "Blogs", "", "Hello world!");
    await expect(
      ContactUsPage.unSuccessfulSubmissionHeader
    ).toHaveTextContaining([
      "Error: all fields are required",
      "Error: Invalid email address"
    ]);
  });
});
