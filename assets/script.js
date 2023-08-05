var searchHistory = []

// 
// DELETE BEFORE COMMIT
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var appID = "&units=metric&appid="
var apiKey = "c3fc82326b5204d58c40763d162c915e"
// DELETE BEFORE COMMIT
// 

// set current date
$('#current-date').text(dayjs().format('(MM/DD/YYYY)'));

// calling weather api function
var getWeather = function (city) {
    var weatherAPI = apiUrl + city + appID + apiKey;

    // makes a request to the url
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        // attaching data to file
        .then(function (data) {
            $("#city").text(data.name);
            $("#temp_max").text(Math.round(data.main.temp_max) + "°C");
            $("#temp_min").text(Math.round(data.main.temp_min) + "°C");
            $("#wind").text(data.wind.speed + " km/h");
            $("#humidity").text(data.main.humidity + "%");
            console.log(data);
        })
        .catch(function (error) {
            console.error(error);
        });


}
console.log(getWeather);

getWeather();