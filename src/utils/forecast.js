const request = require("request");

const forecast = (lat, long, callback) => {
  const weatherURL = `http://api.weatherstack.com/current?access_key=0f62d51c786aa1c313883686bd8f77b0&query=${lat},${long}`;

  request({ url: weatherURL, json: true }, (error, response) => {
    if (error) {
      callback(error, null);
    } else if (response.body.error) {
      callback("unable to find coordinates", null);
    } else {
      const data = response.body.current;
      callback(null, {
        temperature: data.temperature,
        feelslike: data.feelslike,
        weatherDescriptions: data.weather_descriptions,
        humidity: data.humidity,
      });
    }
  });
};

module.exports = forecast;
