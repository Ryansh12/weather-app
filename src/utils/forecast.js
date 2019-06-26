const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/0343cd71a5bd1850393e631d37b7b67b/37.8267,-122.4233?units=si"; //&lang=hi

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      //if we have value for error then we don't have value for response and vice-versa
      callback("unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("unable to find location", undefined);
    } else {
      callback(
        undefined,
        body.daily.data[0].summary +
          " It's currently " +
          body.currently.temperature +
          " degrees out. The high today is " +
          body.daily.data[0].temperatureHigh +
          " with a low of " +
          body.daily.data[0].temperatureLow +
          ". There is " +
          body.currently.precipProbability +
          " % chance of rain."
      );
    }
  });
};

module.exports = forecast;
