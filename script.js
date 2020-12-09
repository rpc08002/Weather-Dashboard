// Variables

let searchButton = $(".searchCity");

let APIKey = "cadd0cedb3b71aa5a82adadf09d49ac6";

// For Loop to Append History of Searched Cities
for (var i = 0; i < localStorage.length; i++); {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass ("list-group-item");

    cityName.append("<li>" + city + "</li>");
}
// Initial Count for Local Storage
var keyCount = 0;

// When Search Buttong is Selected, Performs Ajax Functions
searchButton.click(function () {

    var searchInput =$(".searchInput").val();

    let urlCurrent = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=" + APIKey + "&units=imperial";

    let urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchInput + "&appid=" + APIKey + "&units=imperial";



    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var weatherApiResponse = response;

        queryURL = `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${APIKey}`;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var uvApiResponse = response;
            console.log("UV", uvApiResponse );
            renderCurrentWeather(weatherApiResponse, uvApiResponse);
        })
    });

};
