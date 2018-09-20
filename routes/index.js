var express = require("express");
var chalk = require("chalk");
var router = express.Router();
const gMaps = require("../src/gMaps.js");

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
  randBar = gMaps(3, 4).then(randBar => {
    response.render("index", {
      bar: randBar.name,
      address: randBar.formatted_address,
      lat: randBar.geometry.location.lat,
      lng: randBar.geometry.location.lng
    });
  });
});

module.exports = router;
