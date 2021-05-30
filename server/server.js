const express = require("express");
require("dotenv").config();
const app = express();
const sessionMiddleware = require("./modules/session-middleware");
const axiosRetry = require("axios-retry");
const axios = require("axios");
const passport = require("./strategies/user.strategy");

// Configure axios to retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log("retrying number", retryCount);
    return retryCount * 1000;
  },
});

// Route includes
const userRouter = require("./routes/user.router");
const searchArtistRouter = require("./routes/artist.router");
const searchVenuesRouter = require("./routes/venues.router");
const saveConcertRouter = require("./routes/saveConcert.router");
const showListRouter = require("./routes/showList.router");

// Body parser deprecated; updated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/search", searchArtistRouter);
app.use("/venues", searchVenuesRouter);
app.use("/saveConcert", saveConcertRouter);
app.use("/showList", showListRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
