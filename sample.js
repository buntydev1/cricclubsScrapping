const clubs = require("./sample1.json");
const puppeteer = require("puppeteer");
const fs = require("fs");

var allTeamURL = [];
clubs.forEach((club) => {
  club.allTeams.forEach((team) => {
    allTeamURL.push(team.teamURL);
  });
});
console.log(" this is allTeamURL", allTeamURL);
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
    // console.log("this is noOfPlayers", totalPlayers);
    var extractedPlayerList = [];
    for (i = 0; i < totalPlayers.length; i++) {
      extractedPlayerList.push(totalPlayers[i].replace("PLAYER COUNT : ", ""));
    }
    console.log("this is extractedPlayer", extractedPlayerList);

    // var jsonPlayer = [];
    // jsonPlayer.push(
    //   clubs.map((allplayers) => {
    //     Object.values(allplayers).forEach((players) => {
    //       console.log(" this is players", players.allTeams);
    //     });
    //   })
    // );
    // Object.assign({});
    // jsonPlayer.push(allTeamURL.forEach(players) =>)
    // console.log("this is jsonPlayer", jsonPlayer);

    fs.readFile("./sample1.json", "utf8", (err, jsonString) => {
      if (jsonString) {
        console.log("File data:", jsonString);

        // fs.writeFile("./sample1.json", JSON.stringify(jsonPlayer), (err) => {
        //   if (err) {
        //     console.log("write error: " + err);
        //   }
        // });
      } else {
        console.log("File read failed:", err);
      }
    });
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
}
