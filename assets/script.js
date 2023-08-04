var searchHistory = []

// 
// DELETE BEFORE COMMIT
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="
var appID = "&units=metric&appid="
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
        .then(function (data) {
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}
getWeather();