const express = require("express");
const chalk = require("chalk");
const router = express.Router();
const gMaps = require("../src/gMaps.js");

/* GET home page.*/
router.get("/", function(req, response, next) {
  response.render("index");
});

module.exports = router;
