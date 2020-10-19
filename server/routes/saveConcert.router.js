const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const qs = require("qs");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", (req, res) => {
  // GET route code here
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
  console.log("/saveConcert POST route");
  console.log(req.body.date, req.body.spotifyId, req.body.songKickId);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if (!req.isAuthenticated()) {
    res.sendStatus(403);
    return;
  }
  let queryText, queryParams;

  queryText = `INSERT INTO "concert" ("date", "spotifyId", "songKickId", user_id)
  VALUES ($1, $2, $3, $4)`;
  queryParams = [req.user.id];

  pool
    .query(queryText, [
      req.body.date,
      req.body.spotifyId,
      req.body.songKickId,
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
