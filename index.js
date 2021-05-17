const puppeteer = require("puppeteer");

const allData = require("./filter.json");


fetchteam();

async function fetchteam() {
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
      "https://cricclubs.com/baca/viewInternalClubs.do?clubId=1755"
    );

    await page.waitForSelector("tbody");
    allData.forEach((el) => {
        console.log(el.clubUrl);
      
      });
      
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
}
