
function searchCities(city) {
    // Weather API Key
    var APIKey = "cadd0cedb3b71aa5a82adadf09d49ac6"

    // Building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?" + "q=Atlanta&appid=" + APIKey;

    // Run AJAX Call To The OpenWeatherMap API
    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
        
        console.log(queryURL);
});
}
