import locatingElementsPage from "../pom/webdriver-university/locating-elements.page";
import constants from "../../data/constants";

describe("locating elements", () => {
  beforeEach(async () => {
    await locatingElementsPage.open();
  });

  it("$ - locate element", async () => {
    await locatingElementsPage.navigate();
  });

  it("$$ - locate elememts", async () => {
    await expect(constants.EXPECTED_TITLES).toEqual(
      await locatingElementsPage.getActualTitles()
    );
  });
});
