const axios = require('axios');

let client_id = "9742fa1bfac34acf9ca4950379c182ba"; // Your client id
let client_secret = process.env.client_secret; // Your secret

// Cache
let accessToken;
let expiresAt;

function getAccessToken() {
  if (
    // If I have a cached access token
    accessToken &&
    // And its not expires
    expiresAt.getTime() > new Date().getTime()
  ) {
    return accessToken;
  }

  // Fetch a new one
  let res = axios({
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

  // Cache it for later
  accessToken = res.data.access_token;
  expiresAt = new Date(Date.now() + res.data.expires_in * 1000);

  // And return it.
  return accessToken;
}

module.exports.getAccessToken = getAccessToken;