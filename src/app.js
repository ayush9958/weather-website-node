const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// define path for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Ayush Sharma",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Ayush Sharma",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Ayush Sharma",
    helpText: "Help weather page",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "address not found",
    });
  }
  geocode(address, (error, geocodeData) => {
    if (error) {
      return res.send({
        error: error,
      });
    }
    forecast(
      geocodeData.latitude,
      geocodeData.longitude,
      (error, forecastData) => {
        if (error) {
          return res.send({
            error: error,
          });
        }
        res.send({
          forecast: forecastData,
          location: geocodeData.placeName,
          address: req.query.address,
        });
      }
    );
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "search param is missing",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ayush Sharma",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Ayush Sharma",
    errorMessage: "Page Not Found",
  });
});

app.listen(4000, () => {
  console.log("server is up and running on port 4000");
});
