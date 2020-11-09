const express = require("express");
const app = express();
const static = express.static(__dirname + "/public");

const configRoutes = require("./routes");
const exphbs = require("express-handlebars");
const { response } = require("express");

app.use("/public", static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log("Your routes will be running on http://localhost:3000");
});

// selecting all the elements
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value");
const recovered_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-value");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes-line-chart").getContext("2d");

// APP variable
let app_data = [],
  cases_list = [],
  recovered_list = [],
  deaths_list = [],
  dates = [];

// GET users country code
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach((country) => {
  if (country.code == country_code) {
    user_country = country.name;
  }
});

// API URL and its key
function fetchData(user_country) {
  fetch(
    `https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "",
        "x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
      },
    }
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      dates = Object.keys(data);
      dates.forEach((date) => {
        let DATA = data[date];
        app_data.push(DATA);
        cases_list.push(DATA.total_cases);
      });
    });
}

fetchData(user_country);
