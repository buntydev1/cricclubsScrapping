const clubs = require("./filter11.json");

const puppeteer = require("puppeteer");
const fs = require("fs");

(async (clubs) => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
    });
    // async function fetchPlayerCount(url) {
    //   const page = await browser.newPage();
    //   await page.goto(url, { waitUntil: "load", timeout: 0 });
    //   await page.waitForSelector("div.score-top");
    //   var playerListCount = [];
    //   var noOfPlayers = await page.$eval(
    //     " div.container > div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)",
    //     (e) => e.innerText
    //   );
    //   playerListCount.push(noOfPlayers);
    //   var playerListNumber;
    //   for (i = 0; i < playerListCount.length; i++) {
    //     var playerListNumber = playerListCount[i].replace(
    //       "PLAYER COUNT : ",
    //       ""
    //     );
    //   }
    //   console.log(playerListNumber);

    //   return playerListNumber;
    // }
    async function fetchPlayerName(url) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector("div.panel-body");

      var allPlayerName = await page.$$eval(
        "div.tab-content > div.tab-pane.fade.in.active > div.row > #playersearchdiv > div.col-sm-3 > div.team-player-all > div.team-player-text.text-center > h4 ",
        (allPlayers) => {
          return allPlayers.map((player) => {
            return (obj = {
              PlayerName: player.innerText,
            });
          });
        }
      );

      console.log("this is allPlayerName", allPlayerName);
      return allPlayerName;
    }
    const clubResult = await Promise.all(
      clubs.map(async (club) => {
        return {
          ...club,
          allTeams: await Promise.all(
            club.allTeams.map(async (team) => {
              return {
                ...team,
                // playerCount: await fetchPlayerCount(team.teamURL),

                listOfPlayer: await fetchPlayerName(team.teamURL),
              };
            })
          ),
        };
      })
    );

    fs.writeFile("./filter11json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})(clubs);

// fs.readFile("./sample1.json", "utf8", (err, jsonString) => {
//   if (jsonString) {
//     console.log("File data:", jsonString);

//     fs.writeFile("./sample1.json", (err) => {
//       if (err) {
//         console.log("write error: " + err);
//       }
//     });
//   } else {
//     console.log("File read failed:", err);
//   }
// });
