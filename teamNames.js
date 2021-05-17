const puppeteer = require("puppeteer");
const fs = require("fs");

const clubs = require("./filter.json");
// var listOfClubs = clubs.map((el) => el);
clubs.map((el) => {
  return el.clubUrl;
});
console.log("this is clubData", clubData);

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
            clubUrl: option.href,
          });
        })
    );
    // console.log(allLink);

    // var uniqueArray = JSON.stringify(allLink);

    // fs.writeFile("./filter.json", uniqueArray, function (error) {
    //   if (error) {
    //     console.error("write error:  " + error.message);
    //   } else {
    //     console.log("Successful Write to ");
    //   }
    // });

    const links = [];
    for (i = 0; i < 61; i++) {
      links.push(clubData[i]);
    }
    // console.log(links.length);
    const resultTeam = [];
    for (i = 0; i < links.length; i++) {
      const team = links[i];
      // console.log("this is team", team);
      await page.goto(team);
      await page.waitForSelector("tbody");
      const allTeam = await page.$$eval(
        "tbody:nth-child(2) tr > td:nth-child(2) a",
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

    // // console.log("this is resultTeam", resultTeam);
    var jsonClubData = [];
    clubData.map((c) => {
      return jsonClubData.push(c);
    });
    // var newJSON = [];
    fs.readFile("./filter.json", "utf8", (err, jsonString) => {
      if (jsonString) {
        console.log("File data:", jsonString);

        fs.writeFile("./filter.json", JSON.stringify(newJSON), (err) => {
          if (jsonClubData === resultTeam.teamURL) {
          } else {
            console.log("write error: " + err);
          }
        });
      } else {
        console.log("File read failed:", err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})();
