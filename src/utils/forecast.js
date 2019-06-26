const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/0343cd71a5bd1850393e631d37b7b67b/37.8267,-122.4233?units=si&lang=hi";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //if we have value for error then we don't have value for response and vice-versa
      callback("unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temperature: body.currently.temperature,
        precipProbability: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
