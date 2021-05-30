const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.post("/", rejectUnauthenticated, (req, res) => {
  if (!req.isAuthenticated()) {
    res.sendStatus(403);
    return;
  }
  let queryText, queryParams;

  queryText = `INSERT INTO "show" ("date", "spotifyId", "songKickId", "review", user_id)
  VALUES ($1, $2, $3, $4, $5)`;
  queryParams = [req.user.id];
  console.log("req.body", req.body);

  pool
    .query(queryText, [
      req.body.date,
      req.body.spotifyId,
      req.body.songKickId,
      req.body.review,
      req.user.id,
    ])
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`POST /saveConcert failed`, err);
      res.sendStatus(500);
    });
});

module.exports = router;
