const puppeteer = require("puppeteer");
const fs = require("fs");

const clubs = require("./filter.json");

// var allTeamURL = [];
// clubs.forEach((club) => {
//   Object.values(club).forEach((team) => {
//     for (i = 0; i < team.allTeams.length; i++) {
//       allTeamURL.push(team.allTeams[i]);
//     }
//     console.log("this is allTeamURL", allTeamURL);
//   });
// });
var allTeamURL = [];
clubs.forEach((club) => {
  Object.values(club).forEach((team) => {
    for (i = 0; i < team.allTeams.length; i++) {
      allTeamURL.push(team.allTeams[i].teamURL);
    }
  });
  console.log(" this is allTeamURL", allTeamURL);
});

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

fetchPlayers();

async function fetchPlayers() {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
      // excetuablePath:
      //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    const page = await browser.newPage();
    for (i = 0; i < allTeamURL.length; i++) {
      await page.goto(allTeamURL[i]);
      await page.waitForSelector("container:nth-child(2)");
      const noOfPlayers = await page.$$eval(
        "div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)"
      ).innerText;
      console.log("this is noOFPlayers", noOfPlayers);
    }
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
}
