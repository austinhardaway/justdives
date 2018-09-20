const chalk = require("chalk");

const googleMaps = require("@google/maps").createClient({
  key: "AIzaSyD88tA5lTD_IWlRMMrcvqGVYoStzSLI1os",
  Promise: Promise
});

module.exports = function getBar(lat, lng) {
  return googleMaps
    .places({
      type: "bar",
      language: "en",
      location: [33.9578826, -83.3746134], //Magnolias Bar,
      radius: 1600 //in meters ~1mi
      // opennow: new Date().getHours() < 15 //if it is before 3pm it may return bars that are not open...
    })
    .asPromise()
    .then(res => {
      barArr = res.json.results;
      filterArr = barArr.filter(elem => !elem.types.includes("restaurant"));

      filterArr.forEach(elem => {
        console.log(chalk.blue(elem.name));
      });
      randBar = filterArr[Math.floor(Math.random() * filterArr.length)];
      console.log(randBar);
      return randBar;
    })
    .catch(err => {
      console.log(err);
    });
};
