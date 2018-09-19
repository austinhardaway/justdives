const express = require("express");
const router = express.Router();

const gMaps = require("@google/maps").createClient({
  key: "AIzaSyD88tA5lTD_IWlRMMrcvqGVYoStzSLI1os",
  Promises: true
});

/* GET users listing. */
router.get("/", function(req, res, next) {
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
      console.log(res.json.results);
    });
  res.send("respond with a resource");
});

module.exports = router;
