var express = require("express");
var router = express.Router();

const gMaps = require("@google/maps").createClient({
  key: "AIzaSyD88tA5lTD_IWlRMMrcvqGVYoStzSLI1os",
  Promise: Promise
});

/* GET home page. It's possible I have been drinking. just trying to get into the _spirit_ of things */
router.get("/", function(req, response, next) {
  gMaps
    .places({
      query: "bars",
      language: "en",
      location: [33.9578826, -83.3746134], //Magnolias Bar
      radius: 8000, //~5miles
      opennow: true
    })
    .asPromise()
    .then(res => {
      barArr = res.json.results;
      randBar = barArr[Math.floor(Math.random() * barArr.length)];
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
