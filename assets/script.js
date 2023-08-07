
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var appUnit = "&units=metric"
var appID = "&appid=c3fc82326b5204d58c40763d162c915e"


// set current date
var currentDate = $('#current-date').text(dayjs().format('ddd, MMMM D'));

// calling weather api function
var getWeather = function (city) {
    var weatherAPI = apiUrl + city + appUnit + appID;

    // makes a request to the url
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            displayWeather(data);
        })
        .then(function (data) {
            displayForecast(data);
        })

        .catch(function (error) {
            console.error(error);
        });
}

// attaching data to doc
function displayWeather(data) {
    $("#city").text(data.city.name + ", " + data.city.country);
    $("#temp_max").text(Math.round(data.list[0].main.temp_max) + "°C");
    $("#temp_min").text(Math.round(data.list[0].main.temp_min) + "°C");
    $("#wind").text("Wind: " + data.list[0].wind.speed + " km/h");
    $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");
    $("#icon").attr("src", ("assets/img/" + data.list[0].weather[0].icon + ".svg"));

    // check console to see data
    console.log(data);
};


// function to handle search
function handleSearch(event) {
    event.preventDefault();

    var input = $("#input").val();
    // adds visual warning when search is invalid
    if (!input) {
        $("#input").addClass("border border-danger border-3");
        $("#input").attr("placeholder", "✖ Input not valid.");
    }
    // else(){
    //     return;
    // }
    getWeather(input);
};

// eventAddListener for search
$("#search").on("submit", handleSearch);

// var searchHistory = []

function displayForecast(data) {
    // clears the forecast data
    $("#forecast").empty();

    // loops data over time period
    //  24 hours/ 3 hour api recall = 8th value = 1 day 
    for (i = 1; i < data.list.length; i += 8) {

        // insert data into forecast cards
        let forecastCards = `
        <div class="forecast-card col m-2 bg-white rounded py-4 shadow">
            <div class="forecast-body p-1">
                <h5 class="forecast-date">`+ dayjs(data.list[i].dt * 1000).format('ddd, MMMM D')`</h5>
                <img src="assets/img/"`+ data.list[i].weather[0].icon + `alt="weather icon">
                <h3 class="forecast-temp">`+ data.list[i].main.temp`</h3>
                <p class="forecast-wind">Wind: `+ data.list[i].wind.speed`</p>
                <p class="forecast-humidity">`+ data.list[i].main.humidity`</p>
            </div>
        </div>
        `;

        // attaches forecast to the doc
        $("#forecast").append(forecastCards);
    }
};

console.log(data.list)