const puppeteer = require("puppeteer");
const clubs = require("./baca5.json");
const fs = require("fs");

(async (clubs) => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: true,
    });

    async function fetchPlayerStat(url) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector("div.match-summary  ");
      const stat = await page.$eval(
        "div.score-top.sp.text-center > div.container > div.match-summary > div.row > div.col-sm-12 > div.match-in-summary > div.row > div.col-sm-5 > div.matches-runs-wickets > ul.list-inline ",
        (elements) => {
          let allStat = {
            matches: elements.querySelector("li:nth-Child(1) > span ")
              .innerText,
            runs: elements.querySelector("li:nth-Child(2) > span ").innerText,
            wickets: elements.querySelector("li:nth-Child(3) > span").innerText,
          };
          console.log(allStat);
          return allStat;
        }
      );

      return stat;
    }

    async function getPlayers(team) {
      return Promise.all(
        team.listOfPlayer.map(async (player) => {
          var stat = await fetchPlayerStat(player.playerURL);
          console.log("stat", stat);
          player.matches = stat.matches;
          player.runs = stat.runs;
          player.wickets = stat.wickets;
          return player;
        })
      );
    }

    async function getAllteams(club) {
      return Promise.all(
        club.allTeams.map(async (team) => {
          return {
            ...team,
            listOfPlayer: await getPlayers(team),
          };
        })
      );
    }

    const clubResult = await Promise.all(
      clubs.map(async (club) => {
        const allTeams = await getAllteams(club);
        return {
          ...club,
          allTeams,
        };
      })
    );

    fs.writeFile("./PlayerStat.json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})(clubs);
