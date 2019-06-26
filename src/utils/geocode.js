const request = require("request");

const geoCode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicnNoYXJtYTEyIiwiYSI6ImNqd3EzY2NkcjBtZ3A0Y3FyMHo3enpjajMifQ.8yVnNX6prp2Xd1SUHK0DRA&limit=1";

  request({ url, json: true }, (error, { body } = {}) => {
    if (error) {
      callback("unable to connect to location services", undefined);
    } else if (body.features.length == 0) {
      callback("unable to find location.Try another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geoCode;
