const request = require("request");

const geocode = (address, callback) => {
  const geocodingURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYXl1c2hzaGFybWE5OTU4IiwiYSI6ImNrZGQ0a3NyNzByaXAyc25iY3dkNjlsdXgifQ.pupkxAIMAUiCNEQY_foarA&limit=1`;

  request({ url: geocodingURL, json: true }, (error, response) => {
    if (error) {
      callback(error, null);
    } else if (response.body.features.length === 0) {
      callback("unable to find location", null);
    } else {
      const data = response.body.features[0];
      const latitude = data.geometry.coordinates[1];
      const longitude = data.geometry.coordinates[0];
      const placeName = data.place_name;
      callback(null, { latitude, longitude, placeName });
    }
  });
};

module.exports = geocode;