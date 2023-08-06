var searchHistory = []

// 
// DELETE BEFORE COMMIT
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var appID = "&units=metric&appid="
var apiKey = "c3fc82326b5204d58c40763d162c915e"
// DELETE BEFORE COMMIT
// 

// set current date
$('#current-date').text(dayjs().format('ddd, MMMM D'));

// calling weather api function
var getWeather = function (city) {
    var weatherAPI = apiUrl + city + appID + apiKey;

    // makes a request to the url
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        // attaching data to doc
        .then(function (data) {
            $("#city").text(data.city.name + ", " + data.city.country);
            $("#temp_max").text(Math.round(data.list[0].main.temp_max) + "°C");
            $("#temp_min").text(Math.round(data.list[0].main.temp_min) + "°C");
            $("#wind").text("Wind: " + data.list[0].wind.speed + " km/h");
            $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");
            console.log(data);
        })
        .catch(function (error) {
            console.error(error);
        });
}
console.log(getWeather);

function handleSearch(event) {
    event.preventDefault();

    var searchInp = $('#search-inp').value;

    if (!searchInp) {
        console.error('You need to enter a city name.');
        return;
    }

    var getResult = apiUrl + searchInp + appID + apiKey;
    location.assign(getResult);
}

$("#search").on("submit", handleSearch);

// var forecastAPI = forecastUrl + city + appID + apiKey