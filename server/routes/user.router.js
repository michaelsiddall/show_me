const { default: Axios } = require("axios");
const express = require("express");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const userStrategy = require("../strategies/user.strategy");
const router = express.Router();
require("dotenv").config();

// Handles Ajax request for user information if user is authenticated
router.get("/", rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
router.post("/register", async (req, res, next) => {
  const username = req.body.username;
  const password = encryptLib.encryptPassword(req.body.password);
  const branch_apiKey = process.env.BRANCH_APIKEY;

  const queryText = `INSERT INTO "user" (username, password)
    VALUES ($1, $2) RETURNING id`;
  pool
    .query(queryText, [username, password])
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));

  await Axios({
    method: "POST",
    url: "https://api2.branch.io/v2/event/standard",
    headers: { "content-type": "application/json" },
    data: {
      name: "COMPLETE_REGISTRATION",
      user_data: {
        os: "unidentified_device",
        developer_identity: username,
      },
      event_data: {
        description: "New User Registered",
      },
      branch_key: branch_apiKey,
    },
  });
});

// Handles login form authenticate/login POST
router.post("/login", userStrategy.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post("/logout", (req, res) => {
  req.logout();
  res.sendStatus(200);
});

module.exports = router;
