const request = require('request-promise-native');

const IPIFY_URL = 'https://api.ipify.org?format=json';
const GEO_KEY = '72f8fc70-7a6f-11ec-9e5c-d58bda731736';
const GEO_URL = 'https://api.freegeoip.app/json/';

/*
 * Requests user's ip address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for ip data, returned as JSON string
 */
const fetchMyIP = function() {
  return request(IPIFY_URL);
};

/*
 * Makes a request to freegeoip.app using the provided IP address, to get its geographical information (latitude/longitude)
 * Input: JSON string containing the IP address
 * Returns: Promise of request for lat/lon
 */
const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`${GEO_URL}${ip}?apifkey=${GEO_KEY}`);
};
const fetchISSFlyOverTimes = function(body) {
  const lat = JSON.parse(body).latitude;
  const lng = JSON.parse(body).longitude;
  const requestAddress = request('https://iss-pass.herokuapp.com/json/?lat=' + lat + '&lon=' + lng + '&alt=1045&n=5');
  return requestAddress;
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((body) => {
      const { response } = JSON.parse(body);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };