const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const https = require("https");

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
    const query = req.body.city;
    const id = "2f9b33cef61d3d1b22d82a9d6c369333";
    const unit="metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + id+"&units="+unit;
    https.get(url, function (response) {
        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            // console.log(weatherData);
            const temp = weatherData.main.temp;
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<p>The weather is currently:" + description + "</p>");

            res.write("<h1>The temperature in " + query + " is:" + temp + " degree Celsius</h1>");
            res.write("<img src=" + imageurl + ">");
            res.send();
        });
    });
});

app.listen(3000, function () {
    console.log("Server is running");
});