const puppeteer = require("puppeteer");

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
      "https://cricclubs.com/baca/viewInternalClubs.do?clubId=1755"
    );

    await page.waitForSelector("tbody");

    var b = await page.$$("tr > td:nth-child(2) a");
    // console.log("this is b", b);
    var c = [];

    // b.map((h) => {
    //   c.push(h.href);
    // });

    // b.forEach((h) => c.push(h.href));
    // b.forEach(function () {
    //   return c.push(this.href);
    // });
    console.log(c.length);
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})();
