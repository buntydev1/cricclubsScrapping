const puppeteer = require("puppeteer");

(async () => {
  let browser;
  try {
    console.log("opening the browser.....");
    browser = await puppeteer.launch({
      headless: false,
      // excetuablePath:
      //   "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    });
    const page = await browser.newPage();
    await page.goto(
      "https://cricclubs.com/baca/viewInternalClubs.do?clubId=1755"
    );

    await page.waitForSelector("tbody");

    // var b = await page.$$eval(" tbody > tr > td:nth-child(2) a", (h) => {
    //   return h.forEach((element) => {
    //     element.href;
    //   });
    // });
    // console.log("this is b", b);
    const allLink = await page.$$eval(" tr > td:nth-child(2) a", (options) =>
      options.map((option) => option.href)
    );
    // console.log(allLink);

    const links = [];
    for (i = 2; i <= 62; i++) {
      links.push(allLink[i]);
    }
    // console.log(links.length);
    const resultTeam = [];
    for (i = 0; i < links.length; i++) {
      const team = links[i];
      // console.log("this is team", team);
      await page.goto(team);
      await page.waitForSelector("tbody");
      const allTeam = await page.$$eval(" tr > td:nth-child(2) a", (teams) => {
        return teams.map((t) => {
          return (obj = {
            teamName: t.innerText,
            teamURL: t.href,
          });
        });
      });
      resultTeam.push(allTeam);
    }

    console.log("this is resultTeam", resultTeam);
  } catch (err) {
    console.log("Could not create a browser instance => :", err);
  }
  await browser.close();
})();
