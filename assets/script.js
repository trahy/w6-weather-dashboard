var searchHistory = []

// 
// DELETE BEFORE COMMIT
var apiKey = "c3fc82326b5204d58c40763d162c915e"
// DELETE BEFORE COMMIT
// 

// set current date
$('#current-date').text(dayjs().format('(MM/DD/YYYY)'));

// calling weather api function
var getWeather = function (city) {
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apiKey;

    // makes a request to the url
    fetch(weatherAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        })
}
