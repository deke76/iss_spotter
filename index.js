const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log('It didn\'t work!', error);
//     return;
//   }
//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP('68.144.224.99', (error, coordinates) => {
//   if (error) {
//     console.log('It didn\'t work', error);
//     return;
//   }
//   console.log('It worked! Returned coordinates:', coordinates);
// });

fetchISSFlyOverTimes({ latitude: 45.9979, longitude: -112.5988 }, (error, arrayCoord) => {
  if (error) {
    console.log('It didn\'t work', error);
    return;
  }
  console.log('response:', arrayCoord);
});