const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const axios = require("axios");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

let client_id = "9742fa1bfac34acf9ca4950379c182ba"; // Your client id
let client_secret = process.env.client_secret; // Your secret
/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
  console.log("user id is", req.user.id);

  let queryText, queryParams;
  queryText = `SELECT * FROM "concert" WHERE "user_id" = $1;`;
  queryParams = [req.user.id];

  pool.query(queryText, queryParams).then((result) => {
    // Sends back the results in an object

    console.log("spotify Id", result.rows[1]);
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

        //   res.send(JSON.stringify(req.query));
        let id = result.rows[1].spotifyId;
        console.log("id is", id);

        axios
          .get(`https://api.spotify.com/v1/artists/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then(function (artistResponse) {
            console.log("artist name is ", artistResponse.data.name);

            // res.json({ artists: myArtists });
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
});
/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;
