const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");
require("dotenv").config();

/**
 * GET route template
 */
router.get("/", (req, res) => {
  console.log("/venue GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);
  console.log("req.query.query is", req.query.query);
  axios({
    method: "GET",
    url: "https://api.songkick.com/api/3.0/search/venues.json",
    params: {
      query: req.query.query,
      apikey: process.env.SONGKICK_APIKEY,
    },
  })
    .then((searchVenueResponse) => {
      console.log("got back data", searchVenueResponse.data);
      let songKickObject = searchVenueResponse.data;
      res.send({
        name: songKickObject.resultsPage.results.venue[0].displayName,
        city: songKickObject.resultsPage.results.venue[0].city.displayName,
        state:
          songKickObject.resultsPage.results.venue[0].city.state.displayName,
        songKickId: songKickObject.resultsPage.results.venue[0].id,
      });
    })
    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
    });
});
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
