const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");
require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

//  * GET route template

let client_id = "9742fa1bfac34acf9ca4950379c182ba"; // Your client id
let client_secret = process.env.client_secret; // Your secret

router.get("/", rejectUnauthenticated, (req, res) => {
  // GET route code here
  console.log("/search GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    data: qs.stringify({
      grant_type: "client_credentials",
    }),
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=utf-8",
      Authorization: `Basic ${Buffer.from(
        `${client_id}:${client_secret}`,
        "utf8"
      ).toString("base64")}`,
    },
  })
    .then(function (response) {
      let accessToken = response.data.access_token;
      console.log("req.query.q is", req.query.q);
      //   res.send(JSON.stringify(req.query));
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
              image: artist.images[0].url,
              spotifyId: artist.id,
            };
          });
          res.json({ artists: myArtists });
          // res.json(searchResponse.data);
        })
        .catch(function (error) {
          console.log("Spotify search failed", error);
        });
    })
    .catch(function (error) {
      console.log("Spotify token failed", error);
    });
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("/artist POST route");
  console.log(req.body);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

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
