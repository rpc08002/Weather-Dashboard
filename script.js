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

    //If Else Statement for Ajax Functions
    if (searchInput = "") {
        console.log(searchInput);
    } else { 
        $.ajax({
            url: urlCurrent,
            method: "GET"
        }).then(function (response){
            var cityName = $(".list-group").addClass("list-group-item");
            cityName.append("<li>" + response.name + "</li>");

            var local = localStorage.setItem(keyCount, response.name);
            keyCount = keyCount + 1;
            // Appending Searching History
            var currentCard = $(".currentCard").append("<div>").addClass("card-body");
            currentCard.empty();
            var currentName = currentCard.append("<p>");
            currentCard.append(currentName);

            // Adjust Date 
            var timeUTC = new Date(response.dt * 1000);
            currentName.append(response.name + " " + timeUTC.toLocaleDateString("en-US"));
            currentName.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

            // Add Temp 
            var currentTemp = currentName.append("<p>");

            // Appending Current Temperature Responses
            currentName.append(currentTemp);
            currentTemp.append("<p>" + "Temperature: " + response.main.temp + "</p>");
            currentTemp.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
            currentTemp.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");

            // UV Index URL
            var urlUV = `https://api.openweathermap.org/data/2.5/uvi?appid=cadd0cedb3b71aa5a82adadf09d49ac6&lat=${response.coord.lat}&lon=${response.coord.lon}`;

            // UV Index
            $.ajax({
                url: urlUV,
                method: "GET"
            }).then(function (response) {

                var currentUV = currentTemp.append("<p>" + "UV Index: " + response.value + "</p>").addClass("card-text");
                currentUV.addClass("UV");
                currentTemp.append(currentUV);
                // currentUV.append("UV Index: " + response.value);
            });
            
        });

            // Ajax Call For 5 Day Forecast
            $.ajax({
                url: urlFiveDay,
                method: "GET"
            }).then(function (response) {
                // Array for 5-days 
                var day = [0, 8, 16, 24, 32];
                var fiveDayCard = $(".fiveDayCard").addClass("card-body");
                var fiveDayDiv = $(".fiveDayOne").addClass("card-text");
                fiveDayDiv.empty();
                // For each for 5 days
                day.forEach(function (i) {
                    var FiveDayTimeUTC1 = new Date(response.list[i].dt * 1000);
                    FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
    
                    fiveDayDiv.append("<div class=fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " + response.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");
    
    
                })
    
            });
    }
