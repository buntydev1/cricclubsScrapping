const playerData = require("./sample9.json");
const fs = require("fs");
// console.log(playerData);

var newData = [];
for (i = 0; i < playerData.length; i++) {
  for (j = 0; j < playerData[i]["allTeams"].length; j++) {
    for (k = 0; k < playerData[i].allTeams[j].listOfPlayer.length; k++) {
      for (s = k + 1; s < playerData[i].allTeams[j].listOfPlayer.length; s++) {
        if (
          playerData[i].allTeams[j].listOfPlayer[k].name ==
            playerData[i].allTeams[j].listOfPlayer[s].name &&
          playerData[i].allTeams[j].listOfPlayer[k].playerURL ==
            playerData[i].allTeams[j].listOfPlayer[s].playerURL
        ) {
          delete playerData[i].allTeams[j].listOfPlayer[s].name;
          delete playerData[i].allTeams[j].listOfPlayer[s].playerRole;
          delete playerData[i].allTeams[j].listOfPlayer[s].playerURL;
        }
      }
    }
  }
  newData.push(playerData[i]);
}

// console.log(uniqueArray);

fs.writeFile("./sample11.json", JSON.stringify(newData), (err) => {
  if (err) {
    console.log("write error: " + err);
  }
});
