var express = require("express");
var router = express.Router();

const gMaps = require("@google/maps").createClient({
  key: "AIzaSyD88tA5lTD_IWlRMMrcvqGVYoStzSLI1os",
  Promise: Promise
});
/**
 * @TODO: encapsulate API call
 *        use user geolocation instead of hardcdoed value
 *        filter !dives out of posible results
 *        allow user specified distance
 *        show map location of randBar
 *        be better
 *        dont be bad
 */
/* GET home page. */
router.get("/", function(req, response, next) {
  gMaps
    .places({
      query: "bars",
      language: "en",
      location: [33.9250414, -83.3735397],
      radius: 8000,
      opennow: true
    })
    .asPromise()
    .then(res => {
      barArr = res.json.results;
      randBar = barArr[Math.floor(Math.random() * barArr.length)];
      response.render("index", {
        bar: randBar.name,
        address: randBar.formatted_address
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
