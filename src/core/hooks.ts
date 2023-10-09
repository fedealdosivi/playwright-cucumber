import { After, AfterAll, Before } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { finalizeCoverage, saveV8Coverage } from "./coverageHelper";
import { pageFixture } from "./pageFixture";

Before(async () => {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
    await pageFixture.page.coverage.startJSCoverage();
});

After(async () => {
    await saveV8Coverage(pageFixture.page);
    await pageFixture.page.close();
});

AfterAll(async () => {
    await finalizeCoverage();
});