const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for express config
const publicDirectoryPath = path.join(__dirname, "../public/");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewsPath); //where to look for views
hbs.registerPartials(partialsPath);

//Setuo static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Pratik Mane"
  }); //render allows us to render one of our views. We have configured our express to use view engine 'hbs'
}); //so with render we can render one of our handlebars template

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Pratik Mane"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "Pratik Mane"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    //if no address in query string
    return res.send({
      error: "You must provide an address"
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(latitude, longitude, (error, forecastData) => {
        //callback chaining
        if (error) {
          return res.send({ error });
        }

        res.send({
          location,
          forecast: forecastData,
          address: req.query.address
        });
      });
    }
  );
  // res.send({
  //   forecast: "Its snowing",
  //   location: "Philadelphia",
  //   address: res.query.address
  // });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pratik Mane",
    errorMessage: "help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Pratik Mane",
    errorMessage: "Page Not Found"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
