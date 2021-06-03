const clubs = require("./BACA.json");

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
      const roles = await page.$$eval(
        "div.tab-content > div.tab-pane.fade.in.active > div.row > #playersearchdiv > div.col-sm-3 > div.team-player-all > div.team-player-text ",
        (allRoles) => {
          return allRoles.map((roleStat) => {
            return (obj = {
              name: roleStat.querySelector("h4").innerText,
              playerRole: roleStat.querySelector("h5").innerText,
            });
          });
        }
      );
      return roles;
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

    fs.writeFile("./filter11.json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})(clubs);

// fetchteam();

// async function fetchteam() {
//   let browser;
//   try {
//     console.log("opening the browser.....");
//     browser = await puppeteer.launch({
//       headless: false,
//       // excetuablePath:
//       //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
//     });
//     const page = await browser.newPage();
//     await page.goto(
//       "https://cricclubs.com/baca/viewInternalClubs.do?clubId=1755"
//     );

//     await page.waitForSelector("tbody");
//     const resultTeam = [];
//     for (i = 0; i < clubs.length; i++) {
//       const club = clubs[i];

//       await page.goto(club.clubUrl);
//      await page.waitForSelector("tbody");
//       const allTeam = await page.$$eval(
//         "tbody:nth-child(2) tr > td:nth-child(2) a",
//         (teams) => {
//           return teams.map((t) => {
//             return (obj = {
//               teamName: t.innerText,
//               teamURL: t.href,
//             });
//           });
//         }
//       );
//       resultTeam.push(allTeam);
//     }
//     console.log("this is resultTeam", resultTeam);
//     var updatedJSON = [];
//     updatedJSON.push(
//       clubs.map((c, i) => Object.assign(c, { allTeams: resultTeam[i] }))
//     );
//     console.log("this is updatedJSON", updatedJSON);
//     fs.readFile("./filter.json", "utf8", (err, jsonString) => {
//       if (jsonString) {
//         console.log("File data:", jsonString);

//         fs.writeFile("./filter.json", JSON.stringify(updatedJSON), (err) => {
//           if (err) {
//             console.log("write error: " + err);
//           }
//         });
//       } else {
//         console.log("File read failed:", err);
//       }
//     });
//   } catch (err) {
//     console.log("Could not create a browser instance => :", err);
//   }
//   await browser.close();
// }
