const puppeteer = require("puppeteer");
const fs = require("fs");

const clubs = require("./NCCAPlayerCount.json");

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

    fs.writeFile("./NCCAPlayerName.json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})(clubs);

// clubs.forEach((c) => {
//   c.clubURL;
// });

// (async () => {
//   let browser;
//   try {
//     console.log("opening the browser.....");
//     browser = await puppeteer.launch({
//       headless: false,
//     });
//     const page = await browser.newPage();
//     await page.goto(
//       "https://cricclubs.com/NCCA/viewInternalClubs.do?clubId=1191"
//     );
//     await page.waitForSelector("tbody");
//     const allClubs = await page.$$eval(
//       "tbody:nth-child(2) > tr > td:nth-child(2) a ",
//       (clubs) =>
//         clubs.map((club) => {
//           return (obj = {
//             clubName: club.innerText,
//             clubURL: club.href,
//           });
//         })
//     );

//     // fs.writeFile("./nccaData.json", JSON.stringify(allClubs), function (error) {
//     //   if (error) {
//     //     console.error("write error:  " + error.message);
//     //   } else {
//     //     console.log("Successful Write to ");
//     //   }
//     // });
//   } catch (err) {
//     console.log("Could not create a browser instance => :", err);
//   }
//   await browser.close();
// })();

// fetchTeamData();

// async function fetchTeamData() {
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
//       "https://cricclubs.com/NCCA/viewInternalClubs.do?clubId=1191"
//     );
//     await page.waitForSelector("tbody");
//     const resultTeam = [];

//     for (i = 0; i < clubs.length; i++) {
//       const club = clubs[i];
//       await page.goto(club.clubURL);
//       await page.waitForSelector("tbody");
//       const allTeamData = await page.$$eval(
//         "tbody:nth-child(2) tr > td:nth-child(2) a",
//         (allteams) => {
//           return allteams.map((team) => {
//             return (obj = {
//               teamName: team.innerText,
//               teamURL: team.href,
//             });
//           });
//         }
//       );

//       resultTeam.push(allTeamData);
//     }

//     var updatedJSON = [];
//     updatedJSON.push(
//       clubs.map((c, i) => Object.assign(c, { allTeams: resultTeam[i] }))
//     );

//     fs.readFile("./nccaData.json", "utf8", (err, jsonString) => {
//       if (jsonString) {
//         console.log("File data:", jsonString);

//         fs.writeFile("./nccaData.json", JSON.stringify(updatedJSON), (err) => {
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
