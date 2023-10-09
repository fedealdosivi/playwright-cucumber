import { chromium, expect } from "playwright/test";
import { Page } from "playwright";
import { After, AfterAll, Before, Given, Then, When } from '@cucumber/cucumber';
import { GuinnessPage } from "../guinness-pom/guinnessPage";
import { finalizeCoverage, saveV8Coverage } from "../../core/coverageHelper";
import assert from "assert";

let page: Page;
let guinnessPage: GuinnessPage;

Before(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await context.newPage();
    await page.coverage.startJSCoverage();
});

Given('I navigate to {string}', async function (url : string) {
    guinnessPage = new GuinnessPage(page);
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

After(async () => {
    await saveV8Coverage(guinnessPage.page);
    await guinnessPage.close();
});

AfterAll(async () => {
    await finalizeCoverage();
});
