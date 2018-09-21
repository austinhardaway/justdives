const chalk = require("chalk");

const googleMaps = require("@google/maps").createClient({
  key: "AIzaSyD2D407ERnkT64N8mbn1TyuG7j3TeaCb3E",
  Promise: Promise
});

module.exports = function getBar(lat, lng) {
  return googleMaps
    .places({
      type: "bar",
      language: "en",
      // location: [lat, lng] //for real
      location: [33.9578826, -83.3746134], //Test with Magnolias Bar,
      radius: 8000 //in meters ~1mi
      // rank_by: "distance" //googleMaps.maps.places.RankBy.DISTANCE
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
