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
router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText;
  queryText = `SELECT * FROM "artist"`;
  // queryParams = [req.user.id];

  pool
    .query(queryText)
    .then((result) => {
      // Sends back the results in an object
      res.send(result.rows);
      console.log("results from db", result.rows);
    })
    .catch((error) => {
      console.log("error getting artists", error);
      res.sendStatus(500);
    });
});
/**
 * POST route template
 */
router.post("/", (req, res) => {
  // POST route code here
});

module.exports = router;
