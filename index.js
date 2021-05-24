const puppeteer = require("puppeteer");
const fs = require("fs");

const clubs = require("./filter.json");
(async (clubs) => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
    });
    async function fetchPlayerCount(url) {
      const page = await browser.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 0 });
      await page.waitForSelector("div.score-top");
      var playerListCount = [];
      var noOfPlayers = await page.$eval(
        " div.container > div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)",
        (e) => e.innerText
      );
      playerListCount.push(noOfPlayers);
      var playerListNumber;
      for (i = 0; i < playerListCount.length; i++) {
        var playerListNumber = playerListCount[i].replace(
          "PLAYER COUNT : ",
          ""
        );
      }
      console.log("this is extractedPlayer", playerListNumber[i]);
      return playerListNumber;
    }

    const clubResult = await Promise.all(
      clubs.map(async (club) => {
        return {
          ...club,
          allTeams: await Promise.all(
            club.allTeams.map(async (team) => {
              return {
                ...team,
                playerCount: await fetchPlayerCount(team.teamURL),
              };
            })
          ),
        };
      })
    );
    // fs.writeFile("./filter1.json", JSON.stringify(clubResult), (err) => {
    //   if (err) {
    //     console.log("write error: " + err);
    //   }
    // });
    fs.readFile("./filter.json", "utf8", (err, jsonString) => {
      if (jsonString) {
        console.log("File data:", jsonString);

        fs.writeFile("./filter.json", JSON.stringify(clubResult), (err) => {
          if (err) {
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

// fetchPlayers();

// async function fetchPlayers() {
//   let browser;
//   try {
//     console.log("opening the browser.....");
//     browser = await puppeteer.launch({
//       headless: false,
//     });
//     const page = await browser.newPage();
//     var totalPlayers = [];

//     for (i = 0; i < allTeamURL.length; i++) {
//       await page.goto(allTeamURL[i]);
//       await page.waitForSelector("div.score-top");

//       var noOfPlayers = await page.$eval(
//         " div.container > div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)",
//         (e) => e.innerText
//       );
//       totalPlayers.push(noOfPlayers);
//     }
//     var extractedPlayer = [];
//     for (i = 0; i < totalPlayers.length; i++) {
//       extractedPlayer.push(totalPlayers[i].replace("PLAYER COUNT : ", ""));
//     }
//     console.log("this is extractedPlayer", extractedPlayer);

//     // console.log("this is totalPlayers", totalPlayers);
//     fs.writeFile("./sample3.json", JSON.stringify(extractedPlayer), (err) => {
//       if (err) {
//         console.log("write error: " + err);
//       }
//     });
//   } catch (err) {
//     console.log("Could not create a browser instance => :", err);
//   }
//   await browser.close();
// }
