const clubs = require("./sample1.json");
const puppeteer = require("puppeteer");

var allTeamURL = [];
clubs.forEach((club) => {
  Object.values(club).forEach((team) => {
    for (i = 0; i < team.allTeams.length; i++) {
      allTeamURL.push(team.allTeams[i].teamURL);
    }
  });
  console.log(" this is allTeamURL", allTeamURL);
});

fetchPlayers();

async function fetchPlayers() {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    var totalPlayers = [];

    for (i = 0; i < allTeamURL.length; i++) {
      await page.goto(allTeamURL[i]);
      await page.waitForSelector("div.score-top");

      var noOfPlayers = await page.$eval(
        " div.container > div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)",
        (e) => e.innerText
      );
      totalPlayers.push(noOfPlayers);
    }

    console.log("this is totalPlayers", totalPlayers);
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
}
