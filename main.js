$(document).ready(function() {

  var api = "https://fcc-weather-api.glitch.me/api/current?";
  var lat, lon;
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
        temp = result.main.temp;
        $("#temp").html(temp + " " + unit);
        $("#description").html(result.weather[0].main);
        $("#icon").html("<img src='" + result.weather[0].icon + "'>");
      }
    });
  }

  $("button").on("click", function() {
    if (unit === "F"){
      temp = (temp - 32)/1.8;
      unit = "C";
      $("#temp").html(temp.toFixed(2) + " " + unit);
    }
    else if (unit === "C") {
        temp = (temp * 1.8) + 32;
        unit = "F";
        $("#temp").html(temp.toFixed(2) + " " + unit);
    }
  });

});
