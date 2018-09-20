var express = require("express");
var chalk = require("chalk");
var router = express.Router();

const gMaps = require("@google/maps").createClient({
  key: "AIzaSyD88tA5lTD_IWlRMMrcvqGVYoStzSLI1os",
  Promise: Promise
});

function nextPage(token) {
  console.log(chalk.red("HERE?"));
  return gMaps
    .places({
      pagetoken: token
    })
    .asPromise();
}

/* GET home page. It's possible I have been drinking. just trying to get into the _spirit_ of things */
router.get("/", function(req, response, next) {
  gMaps
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
      response.render("index", {
        bar: randBar.name,
        address: randBar.formatted_address,
        lat: randBar.geometry.location.lat,
        lng: randBar.geometry.location.lng
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
