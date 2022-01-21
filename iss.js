const request = require('request');

const IPIFY_KEY = 'at_zqnvOBbFyulmehhhVBAl78WBzicP1';
const IPIFY_URL = 'https://geo.ipify.org?fpr,at=json'

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) { 
  // use request to fetch IP address from JSON API
  request(IPIFY_URL, response => {
    callback(response);
  });
};

module.exports = { fetchMyIP };