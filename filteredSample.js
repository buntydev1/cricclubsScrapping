const playerData = require("./sample7.json");
const fs = require("fs");

// const allPlayer = [];
// const filteredData = playerData.filter((n) => {
//   return n.allTeams.filter((e) => {
//     return e.listOfPlayer.forEach((allrole) => {
//       console.log(
//         allrole.playerRole === "Bowler" ? allPlayer.push(allrole.name) : "not"
//       );
//     });
//   });
// });

// console.log(filteredData);
// console.log(allPlayer);

// return filteredData;
// const allPlayer = [];
// const filteredData = playerData.filter((element) => {
//   element.allTeams.filter((allrole) => {
//     allrole.listOfPlayer.forEach(
//       (listOfPlayer) => console.log(listOfPlayer)
//       // listOfPlayer.playerRole === "Batsman" ||
//       //   "All Rounder" ||
//       //   "Wicket Keeper"
//       //   ? allPlayer.push(listOfPlayer.name)
//       //   : "not"
//     );
//   });
// });

// return filteredData;

// let newArr = [];
var newData = playerData.map((record) => {
  record.allTeams.map((teams) => {
    if (teams.listOfPlayer.length !== 0) {
      teams.listOfPlayer.filter(
        (x) =>
          !x.playerRole.includes("Bowler") && !x.playerRole.includes("Bowler")
      );
      // newArr.push(newRecord);
    }
  });
  return newData;
});
// console.log(newArr);

fs.writeFile("./sample10.json", JSON.stringify(newData), (err) => {
  if (err) {
    console.log("write error: " + err);
  }
});
