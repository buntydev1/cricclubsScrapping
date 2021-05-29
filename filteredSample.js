const playerData = require("./BACA2.json");
const fs = require("fs");

var newArr = [];
var newData = playerData.map((record) => {
  record.allTeams.map((teams) => {
    if (teams.listOfPlayer.length !== 0) {
      const newRecord = teams.listOfPlayer.filter(
        (x) =>
          !x.playerRole.includes("Bowler") && !x.playerRole.includes("Bowler")
      );
      newArr.push(newRecord);
    }
  });
  return newData;
});
console.log(newArr);

fs.writeFile("./BACAName.json", JSON.stringify(newArr), (err) => {
  if (err) {
    console.log("write error: " + err);
  }
});
