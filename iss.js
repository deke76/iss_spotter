const request = require('request');

const IPIFY_KEY = 'at_zqnvOBbFyulmehhhVBAl78WBzicP1';
const IPIFY_URL = 'https://api.ipify.org?format=json';
const GEO_KEY = '72f8fc70-7a6f-11ec-9e5c-d58bda731736';
const GEO_URL = 'https://api.freegeoip.app/json/';
const ISS_STRING = 'https://iss-pass.herokuapp.com/json/?lat=51.0857&lon=-114.0234&alt=1045&n=5';

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
  request(IPIFY_URL, (error, response, body) => {
    if (error)  callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
      return;
    }
    const objData = JSON.parse(body);
    callback(null, objData.ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`${GEO_URL}${ip}?apikey=${GEO_KEY}`, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching coordinates for IP: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

/**
 * Makes a single API request to retrieve upcoming ISS fly over times the for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 **/

const fetchISSFlyOverTimes = function(coords, callback) {
  request(ISS_STRING, (error, response, body) => {
    if (error) callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching passover times.`;
      callback(Error(msg), null);
      return;
    }
    console.log(JSON.parse(body).response);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };