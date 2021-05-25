const allNames = require("./filter12.json");
const fs = require("fs");
var allFilterName = allNames.map((n) => {
  return n.allTeams.map((p) => {
    return p.listOfPlayer.map((t) => {
      return t.PlayerName;
    });
  });
});

console.log(allFilterName);
// var jsonObject = allFilterName.map(JSON.stringify);
var uniqueSet = new Set(allFilterName);
var uniqueArray = Array.from(uniqueSet);

fs.writeFile(
  "filterNames3.json",
  JSON.stringify(uniqueArray),
  function (error) {
    if (error) {
      console.error("write error:  " + error.message);
    } else {
      console.log("Successful Write to ");
    }
  }
);
