const clubs = require("./sample1.json");

clubs.forEach((club) => {
  Object.values(club).forEach((team) => {
    for (i = 0; i < team.allTeams.length; i++) {
      console.log(team.allTeams[i].teamURL);
    }
  });
});
