const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    await page.goto(
      "https://cricclubs.com/NCCA/viewInternalClubs.do?clubId=1191"
    );
    await page.waitForSelector("tbody");
    const allClubs = await page.$$eval(
      "tbody:nth-child(2) > tr > td:nth-child(2) a ",
      (clubs) =>
        clubs.map((club) => {
          return (obj = {
            clubURL: club.href,
            clubName: club.innerText,
          });
        })
    );
    console.log("this is allClubs", allClubs);
    fs.writeFile("./nccaData.json", JSON.stringify(allClubs), function (error) {
      if (error) {
        console.error("write error:  " + error.message);
      } else {
        console.log("Successful Write to ");
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})();
