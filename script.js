let APIKey = "cadd0cedb3b71aa5a82adadf09d49ac6";



function requestWeather() {

    let queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    $.ajax({
        url:queryURL,
        method: "GET"
    }).then(function(response){
        console.log(response)
        var weatherApiResponse = response;

        lon = response.coord.lon;
        lat = response.coord.lat;

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
