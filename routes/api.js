const express = require("express");
const router = express.Router();
const gMaps = require("../src/gMaps.js");

/**
 * Endpoint for the client to request a bar.
 * Client sends a json object with keys {lat, lng}
 * that represents their current posiiton
 *
 * Returns a json object with all information
 * needed to find that bar in a drunken
 * stupor. Important for performance and not
 * overloading blind drunk folk to not send
 * to much info
 */
router.post("/", function(req, res) {
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
