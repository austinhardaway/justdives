const express = require("express");
const router = express.Router();
const gMaps = require("../src/gMaps.js");

/* Post api listing. */
router.post("/", function(req, res) {
  console.log(req.body);
  gMaps(req.body.lat, req.body.lng).then(randBar => {
    res.send({
      bar: randBar.name,
      address: randBar.formatted_address,
      lat: randBar.geometry.location.lat,
      lng: randBar.geometry.location.lng
    });
  });
});

module.exports = router;
