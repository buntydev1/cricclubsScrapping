const puppeteer = require("puppeteer");
var fs = require("fs");
const data = require("./filter.json");
console.log("this is data", data);

const dataJSON = data.map((element) => {
  return element.clubLink;
  // return (obj = {
  //   clubJSON: element.clubLink,
  // });
});

console.log(dataJSON.length);

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

    const allLink = await page.$$eval(
      "tbody:nth-child(2) > tr > td:nth-child(2) a",
      (options) =>
        options.map((option) => {
          return (obj = {
            clubName: option.innerText,
            clubLink: option.href,
          });
        })
    );
    // console.log(allLink);

    const links = [];
    for (i = 0; i < 61; i++) {
      links.push(dataJSON[i]);
    }
    // console.log(links.length);
    const resultTeam = [];
    for (i = 0; i < links.length; i++) {
      const team = links[i];
      // console.log("this is team", team);
      await page.goto(team);
      await page.waitForSelector("tbody");
      const allTeam = await page.$$eval(
        "tbody:nth-child(2) > tr > td:nth-child(2) a",
        (teams) => {
          return teams.map((t) => {
            return (obj = {
              teamName: t.innerText,
              teamURL: t.href,
            });
          });
        }
      );
      resultTeam.push(allTeam);
    }

    console.log("this is resultTeam", resultTeam);
    var jsonObject = resultTeam.map(JSON.stringify);

    var uniqueSet = new Set(jsonObject);
    var uniqueArray = Array.from(uniqueSet);

    fs.writeFile("filter.json", uniqueArray, function (error) {
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
