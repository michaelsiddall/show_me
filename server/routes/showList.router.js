const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const axios = require("./axios");
const axiosRetry = require("axios-retry");

require("dotenv").config();
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const { getAccessToken } = require("./spotify");

router.get("/", async (req, res) => {
  try {
    let queryText, queryParams;
    queryText = `SELECT * FROM "show" WHERE "user_id" = $1 ORDER BY "date" DESC;`;
    queryParams = [req.user.id];
    let favorite = req.query.favorite;
    console.log("favorite q param is", favorite);

    if (favorite) {
      queryText = `SELECT * FROM "show" WHERE "user_id" = $1 AND "favorite"=true ORDER BY "date" DESC;`;
    }
    const results = await pool.query(queryText, queryParams);

    // This is an axios request to get an authorization token from spotify.
    const accessToken = await getAccessToken();

    // // Declare the accesstoken variable and get it from the auth response.
    // let accessToken = authResponse.data.access_token;

    // Mapping database query to promises that when fulfilled, returns the results
    const promises = results.rows.map(async (row) => {
      const response = await axios({
        method: "GET",
        url: `https://api.spotify.com/v1/artists/${row.spotifyId}`,
        timeout: 5000,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // return artistResults ( the query results and add information from Spotify API call)
      return {
        showId: row.id,
        date: row.date,
        artistName: response.data.name,
        image: response.data.images[0].url,
        genre: response.data.genres[0],
        venueId: row.songKickId,
        review: row.review,
      };
    });

    const artistResults = await Promise.all(promises);
    console.log("artistResults are", artistResults);

    // Mapping artistResults to promises and making SongKick API call to add venue info

    const venuePromises = artistResults.map(async (showData) => {
      const response = await axios({
        method: "GET",
        url: `https://api.songkick.com/api/3.0/venues/${showData.venueId}.json`,
        timeout: 5000,
        params: {
          apikey: process.env.SONGKICK_APIKEY,
        },
      });
      /// Return all of artistResults updated with SongKick info and renamed venueResults
      return {
        showId: showData.showId,
        date: showData.date,
        artistName: showData.artistName,
        image: showData.image,
        genre: showData.genre,
        venueName: response.data.resultsPage.results.venue.displayName,
        review: showData.review,
      };
    });
    const venueResults = await Promise.all(venuePromises);
    res.send(venueResults);
  } catch (err) {
    if (err.response) {
      console.log(err.response.data); // => the response payload
    }
    res.send(500);
  }
});

router.get("/:id");

//  EDIT:  Allow user to "favorite" shows
router.put("/:id", rejectUnauthenticated, (req, res) => {
  const queryString = "UPDATE show SET favorite=true WHERE id=$1";

  pool
    .query(queryString, [req.params.id])
    .then((results) => {
      //if succesful send 200
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log(err);
      //if unnsuccessful send 500;
      res.sendStatus(500);
    });
});

router.delete("/:id", rejectUnauthenticated, (req, res) => {
  pool
    .query('DELETE FROM "show" WHERE id=$1', [req.params.id])
    .then((result) => {
      res.sendStatus(200);
    })
    .catch((error) => {
      res.sendStatus(500);
    });
});

module.exports = router;
