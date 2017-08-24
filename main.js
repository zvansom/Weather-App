$(document).ready(function() {

  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat, lon;
  var temp = {};
  var unit = "C";

  // Retrieve location from user and send to API
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
    var lat = "lat=" + position.coords.latitude;
    var lon = "&lon=" + position.coords.longitude;
    getWeather(lat, lon);
    });
  }

  function getWeather(lat, lon) {
    var urlString = api + lat + lon;
    $.ajax({
      method: "GET",
      url: urlString,
      success: function(result){
        $("#location").html(result.name);
        temp = result.main.temp
        $("#temp").html(temp + " " + unit);
        $("#description").html(result.weather[0].main);
        $("#icon").html("<img src='" + result.weather[0].icon + "'>");
        return temp;
      }
    });
  }

  $("button").on("click", function() {
    alert(temp+" "+ unit);
    convertTemp(temp, unit);
  });

  function convertTemp(temp, unit) {
    if (unit === "F"){
      fahrenheitToCelcius(temp, unit);
    } else if (unit === "C") {
      celciusToFahrenheit(temp, unit);
    }
  }

  function celciusToFahrenheit(temp, unit) {
    temp = (temp * 1.8) + 32;
    unit = "F";
    $("#temp").html(temp + " " + unit);
    alert(unit);
    return temp, unit;
  }

  function fahrenheitToCelcius(temp, unit) {
    alert("This function works");
    temp = (temp - 32)/1.8;
    unit = "C"; 
    $("#temp").html(temp + " " + unit);
    return temp, unit;
  }



});
