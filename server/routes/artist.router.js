const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");
const qs = require("qs");

//  * GET route template
//  *
//  *
//  *
//  *
//  */
let client_id = "9742fa1bfac34acf9ca4950379c182ba"; // Your client id
let client_secret = process.env.client_secret; // Your secret

router.get("/", (req, res) => {
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
      console.log("req.query.q is", req.query);
      //   res.send(JSON.stringify(req.query));
      axios
        .get("https://api.spotify.com/v1/search", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          params: {
            q: req.query.q,
            type: "artist",
          },
        })
        .then(function (searchResponse) {
          let exampleObject = {
            name: "Deerhunter",
            image:
              "https://i.scdn.co/image/ef8563081fa5394c1ec53f8e2a87a67fdec7a70d",
            genre: "alternative dance",
            spotifyId: "38zTZcuN7nFvVJ6auhc6V3",
          };
          let spotifyObject = searchResponse.data;
          res.send(spotifyObject);
          // res.send({ name: spotifyObject.artists.items[0].name });
        })
        .catch(function (error) {
          console.log("error is", error);
        });
    })
    .catch(function (error) {
      console.log("error is", error);
    });
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
