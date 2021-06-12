const playerData = require("./BACA6.json");
const fs = require("fs");

// var newArr = [];
// var newData = playerData.map((record) => {
//   record.allTeams.map((teams) => {
//     if (teams.listOfPlayer.length !== 0) {
//       const newRecord = teams.listOfPlayer.filter(
//         (x) =>
//           !x.playerRole.includes("Bowler") && !x.playerRole.includes("Bowler")
//       );
//       newArr.push(newRecord);
//     }
//   });
//   return newData;
// });
// console.log(newArr);

var newData = [];
for (i = 0; i < playerData.length; i++) {
  for (j = 0; j < playerData[i].allTeams.length; j++) {
    for (k = 0; k < playerData[i].allTeams[j].listOfPlayer.length; k++) {
      if (
        playerData[i].allTeams[j].listOfPlayer[k].playerRole.includes("Bowler")
      ) {
        delete playerData[i].allTeams[j].listOfPlayer[k].name;
        delete playerData[i].allTeams[j].listOfPlayer[k].playerRole;
        delete playerData[i].allTeams[j].listOfPlayer[k].playerURL;
      }
    }
  }
  newData.push(playerData[i]);
}
console.log("newData", newData);

fs.writeFile("./sample1.json", JSON.stringify(newArr), (err) => {
  if (err) {
    console.log("write error: " + err);
  }
});
