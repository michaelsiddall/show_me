const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("./axios");
const qs = require("qs");
const { getAccessToken } = require("./spotify");
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

const branch_apiKey = process.env.BRANCH_APIKEY;

router.get("/", rejectUnauthenticated, (req, res) => {
  // gets and submits access token to Spotify API for artist searchs
  getAccessToken()
    .then(function (accessToken) {
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: req.query.q,
            type: "artist",
            limit: "10",
          },
        })
        .then(function (searchResponse) {
          let spotifyArtists = searchResponse.data.artists.items;
          let myArtists = spotifyArtists.map((artist) => {
            return {
              name: artist.name,
              genre: artist.genres[0],
              image: artist.images.length ? artist.images[0].url : null,
              spotifyId: artist.id,
            };
          });
          res.json({ artists: myArtists });
        })
        .catch(function (error) {
          res.sendStatus(500);
          console.log("Spotify search failed", error);
        });
    })
    .catch(function (error) {
      res.sendStatus(500);
      console.log("Spotify token failed", error);
    });
  // search term event captured and sent to Branch.io
  axios({
    method: "POST",
    url: "https://api2.branch.io/v2/event/standard",
    headers: { "content-type": "application/json" },
    data: {
      name: "SEARCH",
      user_data: {
        os: "unidentified_device",
        developer_identity: req.user.username,
      },
      event_data: {
        description: req.query.q,
      },
      branch_key: branch_apiKey,
    },
  });
});

router.post("/", rejectUnauthenticated, (req, res) => {
  if (!req.isAuthenticated()) {
    res.sendStatus(403);
    return;
  }
  const queryString = `INSERT INTO "artist" ("name", "genre", "image", "spotifyId" )
  VALUES ($1, $2, $3, $4)`;
  pool
    .query(queryString, [
      req.body.name,
      req.body.genre,
      req.body.image,
      req.body.spotifyId,
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
