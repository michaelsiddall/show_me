const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");
const swal = require("sweetalert");
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, (req, res) => {
  console.log("/venues GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);
  console.log("req.query.query is", req.query.query);
  axios({
    method: "GET",
    url: "https://api.songkick.com/api/3.0/search/venues.json",
    params: {
      query: req.query.query,
      apikey: process.env.SONGKICK_APIKEY,
      page: "1",
      per_page: "5",
    },
  })
    .then((searchVenueResponse) => {
      console.log("got back data", searchVenueResponse.data);
      let songKickObject = searchVenueResponse.data.resultsPage.results.venue;

      let myVenues = songKickObject.map((venue) => {
        return {
          name: venue.displayName,
          address: venue.street,
          city: venue.city.displayName,
          // state: venue.city.state.displayName,
          songKickId: venue.id,
        };
      });
      res.json({ venues: myVenues });
    })
    .catch((err) => {
      console.error(err);

      res.sendStatus(500);
      swal({ text: "SongKick Venue Search Failed" });
    });
});
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("/venues POST route");
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (!req.isAuthenticated()) {
    res.sendStatus(403);
    return;
  }
  const queryString = `INSERT INTO "venues" ("user_id", "name", "address", "city", "songKickId" )
  VALUES ($1, $2, $3, $4, $5)`;
  pool
    .query(queryString, [
      req.user.id,
      req.body.name,
      req.body.address,
      req.body.city,
      req.body.songKickId,
    ])
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`POST /Add Artist failed`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
