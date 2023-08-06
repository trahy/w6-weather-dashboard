var searchHistory = []

// 
// DELETE BEFORE COMMIT
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var appUnit = "&units=metric"
var appID = "&appid=c3fc82326b5204d58c40763d162c915e"
// DELETE BEFORE COMMIT
// 

// set current date
$('#current-date').text(dayjs().format('ddd, MMMM D'));

// calling weather api function
var getWeather = function (city) {
    var weatherAPI = apiUrl + city + appUnit + appID;

    // makes a request to the url
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        // attaching data to doc
        .then(function (data) {
            displayData(data);
        })
        .catch(function (error) {
            console.error(error);
        });
}
console.log(getWeather);


function displayData(data) {
    $("#city").text(data.city.name + ", " + data.city.country);
    $("#temp_max").text(Math.round(data.list[0].main.temp_max) + "°C");
    $("#temp_min").text(Math.round(data.list[0].main.temp_min) + "°C");
    $("#wind").text("Wind: " + data.list[0].wind.speed + " km/h");
    $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");

    console.log(data);
}

function handleSearch(event) {
    event.preventDefault();

    var input = $("#input").val();

    if (!input) {
        console.error('You need to enter a city name.');
        return;
    }

    getWeather(searchInp);
}

$("#search").on("submit", handleSearch);
