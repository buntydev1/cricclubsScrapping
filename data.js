const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
      // excetuablePath:
      //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    const page = await browser.newPage();
    await page.goto(
      "https://cricclubs.com/NCCA/viewInternalClubs.do?clubId=1191"
    );
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})();
