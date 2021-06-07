const puppeteer = require("puppeteer");
const clubs = require("./sample9.json");
// const clubs = require("./sample7.json");
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
      await page.waitForSelector("div.score-all");
      const options = await page.$$eval(
        "div.score-top.sp.text-center > div.container > div.match-summary > div.row > div.col-sm-12 > div.match-in-summary > div.row > div.col-sm-5 > div.matches-runs-wickets > ul.list-inline ",
        (options) => {
          return options.map((option) => {
            return (obj = {
              matches: option.querySelector(" li:nth-Child(1) >span").innerText,
              runs: option.querySelector("li:nth-Child(2) > span").innerText,
              wickets: option.querySelector("li:nth-Child(3) > span").innerText,
            });
          });
        }
      );
      console.log("options", options);
      return options;
    }

    async function getPlayers(team) {
      return Promise.all(
        team.listOfPlayer.map(async (player) => {
          return {
            ...player,
            playerStat: await fetchPlayerStat(player.playerURL),
          };
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
    console.log("clubResult", clubResult);
    // return;

    fs.writeFile("./sample10.json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})(clubs);
