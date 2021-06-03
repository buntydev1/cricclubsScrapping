const playerData = require("./sample7.json");
const fs = require("fs");

// var newArr = [];
// playerData.map((record) => {
//   let newAllTeamsArray = [];
//   return record.allTeams.map((teams) => {
//     if (teams.listOfPlayer.length !== 0) {
//       let newRecord = teams.listOfPlayer.filter(
//         (x) =>
//           !x.playerRole.includes("Bowler") && !x.playerRole.includes("Bowler")
//       );
//       newAllTeamsArray.push(newRecord);
//     }
//   });
//   var newObj = {...record,allTeams:{...record.allTeams,listOfPlayer}}
// });
// console.log(newData);

// var newData = [];
// for (i = 0; i < playerData.length; i++) {
//   for (j = 0; j < playerData[i].allTeams.length; j++) {
//     for (k = 0; k < playerData[i].allTeams[j].listOfPlayer.length; k++) {
//       if (
//         playerData[i].allTeams[j].listOfPlayer[k].playerRole.includes(
//           "Batsman"
//         ) ||
//         playerData[i].allTeams[j].listOfPlayer[k].playerRole.includes(
//           "All Rounder"
//         ) ||
//         playerData[i].allTeams[j].listOfPlayer[k].playerRole.includes(
//           "Wicket Keeper"
//         )
//       ) {
//         newData.push(playerData[i].allTeams[j].listOfPlayer[k]);
//       }
//     }
//   }
// }
// console.log("newData", newData);

var newData = [];
for (i = 0; i < playerData.length; i++) {
  for (j = 0; j < playerData[i].allTeams.length; j++) {
    for (k = 0; k < playerData[i].allTeams[j].listOfPlayer.length; k++) {
      if (
        playerData[i].allTeams[j].listOfPlayer[k].playerRole.includes("Bowler")
      ) {
        delete playerData[i].allTeams[j].listOfPlayer[k].name;
        delete playerData[i].allTeams[j].listOfPlayer[k].playerRole;
      }
    }
  }
  newData.push(playerData[i]);
}
console.log("newData", newData);

fs.writeFile("./sample21.json", JSON.stringify(newData), (err) => {
  if (err) {
    console.log("write error: " + err);
  }
});
