const express = require("express");
const https = require("https");

const app = express();

app.get("/", function(req, res){
  const url = "https://api.openweathermap.org/data/2.5/weather?q=edo&appid=29c9e1555a839ec91c9fd3baac02bf99&units=metric";
  https.get(url, function(response){
    console.log(response.statusCode);
    response.on("data", function(data){
      wData = JSON.parse(data);
      const text = wData.weather[0].description;
      const degree = wData.main.temp;
      const icon = wData.weather[0].icon;
     const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("The weather is " + degree + " degree Celsius");
      res.write(" and it's " + text);
      res.write("<img src=" + imageUrl + ">");
      res.send();
    });
  });
});

app.listen(3000, () => {
  console.log("Running server");
});