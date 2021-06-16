const puppeteer = require("puppeteer");
const fs = require("fs");
const { url } = require("inspector");

async function startBrowser() {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
      // excetuablePath:
      //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    const page = await browser.newPage();
    // console.log("type of page", page);
    await page.goto("https://www.linkedin.com");
    // await page.waitFor(3000);
    await page.click("#session_key");

    await page.keyboard.type("najmavirani06@gmail.com");
    await page.click('[id="session_password"]');

    await page.keyboard.type("Bunty123Virani");
    await page.click('[type="submit"]');

    await page.waitFor(3000);

    await page.goto(
      "https://www.linkedin.com/in/yasin-virani-b642361b2/detail/recent-activity/shares/",
      { waitUntil: "load" }
    );
    await page.waitForSelector("div#ember124");
    await page.click("ul > li > button");
    await page.waitForSelector(
      "div.artdeco-modal__content.social-details-reactors-modal__content.ember-view"
    );

    const alloptions = await page.$$eval(
      "div.social-details-reactors-tab-body > div > ul",
      (options) => {
        console.log(options);
        // var urls = [];
        for (var i = 0; i < options.length; i++) {
          console.log(options[i].children);
          // Array.from(options[i].children.HTMLCollection).forEach((element) => {
          //   console.log("element", element);
          // });
        }
        // console.log(urls);
        // options.forEach((values) => {
        //   console.log(values.children);
        // });
      }
    );
    // console.log(cityArray);
    console.log(alloptions);
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  return browser;
}

startBrowser();
