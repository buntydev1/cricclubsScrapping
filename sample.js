const clubs = require("./sample1.json");

const puppeteer = require("puppeteer");
const fs = require("fs");

(async (clubs) => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: true,
    });
    async function fetchPlayerCount(url) {
      const page = await browser.newPage();
      await page.goto(url);
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
    fs.writeFile("./sample18.json", JSON.stringify(clubResult), (err) => {
      if (err) {
        console.log("write error: " + err);
      }
    });
  } catch (error) {}
})(clubs);

// console.log(" this is allTeamURL", allTeamURL);
// fetchPlayers();

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
    console.log("this is noOfPlayers", totalPlayers);
    var playerListCount = [];
    for (i = 0; i < totalPlayers.length; i++) {
      playerListCount.push(totalPlayers[i].replace("PLAYER COUNT : ", ""));
    }
    console.log("this is extractedPlayer", extractedPlayerList);

    // var listOFPlayers = [];
    // var listOFPlayers = extractedPlayerList.map((player) => {
    //   return player;
    // });

    // console.log("listOFPlayers", listOFPlayers);
    // var listOFPlayer = [];
    // listOFPlayers.forEach((p) => {
    //   listOFPlayer.push(p);
    // });
    // console.log("listOFPlayers", listOFPlayer);

    // var listOFPlayer = [];
    // extractedPlayerList.map((palyer) => {
    //   return (obj = {
    //     playerList: palyer,
    //   });
    // });

    // var listOFPlayer1 = [];
    // for (i = 0; i < listOFPlayer.length; i++) {
    //   listOFPlayer.push(listOFPlayer[i]);
    // }
    // console.log("this is listOfPlayer", listOFPlayer1);
    // var jsonPlayer = [];
    // jsonPlayer.push(
    //   clubs.forEach((allplayers) => {
    //     allplayers.allTeams.forEach((players, i) => {
    //       console.log(
    //         Object.assign(players, {
    //           playerCount: playerListCount[i],
    //         })
    //       );
    //     });
    //   })
    // );
    // extractedPlayerList.forEach((playerNo) => {
    //   console.log(Object.assign(players, { playerCount: playerNo }));
    // });
    fs.readFile("./sample1.json", "utf8", (err, jsonString) => {
      if (jsonString) {
        console.log("File data:", jsonString);

        fs.writeFile("./sample1.json", (err) => {
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
}

// var clubResult = await Promise.all(
//   clubs.map(async (club) => {
//     return await Promise.all(
//       club.allTeams.map(async (team) => {
//         console.log("this is teamURL", team.teamURL);
//         const page = await browser.newPage();
//         await page.goto(team.teamURL);
//         await page.waitForSelector("div.score-top");
//         var noOfPlayers = await page.$eval(
//           " div.container > div.match-summary > div.row > div.col-sm-10.col-sm-offset-2 > div.match-in-summary > div.row > div:nth-child(2) > div.team-text-in.text-left > p:nth-child(4)",
//           (e) => e.innerText
//         );
//         // team.playerCount = 4;
//         return await team;
//       })
//     );
//   })
// );
