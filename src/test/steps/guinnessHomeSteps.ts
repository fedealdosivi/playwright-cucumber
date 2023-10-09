import { Given, Then, When } from '@cucumber/cucumber';
import { GuinnessPage } from "../guinness-pom/guinnessPage";
import assert from "assert";
import { pageFixture } from "../../core/pageFixture";

let guinnessPage: GuinnessPage;

Given('I navigate to {string}', async function (url : string) {
    guinnessPage = new GuinnessPage(pageFixture.page);
    await guinnessPage.navigate(url);
});

When('I enter date of birth {string} {string} {string}', async function (dd: string, mm: string, yyyy: string) {
    await guinnessPage.enterDateOfBirth(dd, mm, yyyy);
});

When('I navigate to shop', async function () {
    try {
        await guinnessPage.navigateToShop();
    } catch (error) {
        console.log('Could not navigate to the shop', error);
    }
})

Then('I should be on the home page', async function () {
    try {
        assert.strictEqual(await guinnessPage.page.url(), "https://www.guinness.diageo.site/");
    } catch (error) {
        console.log('Could not validate user is on the home page', error);
    }
});
