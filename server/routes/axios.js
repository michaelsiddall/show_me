const axios = require("axios");
// Import dependencies
const { setupCache } = require("axios-cache-adapter");
// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: 15 * 60 * 1000,
});
// Create `axios` instance passing the newly created `cache.adapter`
const cachedAxios = axios.create({
  adapter: cache.adapter,
});
module.exports = cachedAxios;
