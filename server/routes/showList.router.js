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
  console.log("user id is", req.user.id);

  let queryText, queryParams;
  queryText = `SELECT * FROM "concert" WHERE "user_id" = $1;`;
  queryParams = [req.user.id];

  pool
    .query(queryText, queryParams)
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
router.post("/", rejectUnauthenticated, (req, res) => {
  // POST route code here
});

module.exports = router;
