
var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
var appUnit = "&units=metric"
var appID = "&appid=c3fc82326b5204d58c40763d162c915e"

var searchHistory = []
var previousCity = ""

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
            displayForecast(data);
        })
        .catch(function (error) {
            console.error(error);
            handleError();
        });
}

// attaching data to doc
function displayWeather(data) {

    // displays container upon search
    $('.right-container').removeAttr('hidden');

    $('#search').trigger("reset");

    // Remove invalid classes
    $("#input").removeClass("border border-danger border-3");
    $("#input").attr("placeholder", "Enter city name");

    $("#city").text(data.city.name + ", " + data.city.country);
    $("#temp_max").text(Math.round(data.list[0].main.temp_max) + "°C");
    $("#temp_min").text(Math.round(data.list[0].main.temp_min) + "°C");
    $("#wind").text("Wind: " + data.list[0].wind.speed + " km/h");
    $("#humidity").text("Humidity: " + data.list[0].main.humidity + "%");
    $("#icon").attr("src", ("assets/img/" + data.list[0].weather[0].icon + ".svg"));

    // check console to see data
    console.log(data);
};

function handleError() {
    $("#input").addClass("border border-danger border-3");
    $("#input").attr("placeholder", "✖ Input not valid.");
}

// function to handle search
function handleSearch(event) {
    event.preventDefault();

    var input = $("#input").val();
    // adds visual warning when search is invalid
    if (!input) {
        return handleError();
    }

    getWeather(input);
};

// eventAddListener for search
$("#search").on("submit", handleSearch);

function displayForecast(data) {
    if (data == null) {
        return;
    }

    // clears the forecast data
    $("#forecast").empty();

    // loops data over time period
    //  24 hours/ 3 hour api recall = 8th value = 1 day 
    for (let i = 7; i < data.list.length; i += 8) {

        let date = dayjs.unix(data.list[i].dt * 1000).format('ddd, MMMM D');
        let img = `assets/img/${data.list[i].weather[0].icon}.svg`;
        let temp = Math.round(data.list[i]["main"]["temp"]);
        let wind = data.list[i]["wind"]["speed"];
        let humidity = data.list[i]["main"]["humidity"];

        // insert data into forecast cards
        let forecastCards = `
            <div id="forecast-card" class="col m-1 bg-white py-4 shadow-sm">
                <div class="forecast-body text-center">
                    <h5 class="forecast-date">`+ date + `</h5>
                    <img class="forecast-img" src="`+ img + `" alt="weather icon">
                    <h3 class="forecast-temp mb-3">`+ temp + `°C</h3>
                    <p class="forecast-wind">Wind: `+ wind + `km/h</p>
                    <p class="forecast-humidity">Humidty: `+ humidity + `%</p>
                </div>
            </div>
        `;

        // attaches forecast to the doc
        $("#forecast").append(forecastCards);
    }


    // saves the city name of previously searched
    previousCity = data.city.name;

    // save to the search history using the api's name value for consistancy
    // this also keeps searches that did not return a result from populating the array
    saveSearch(data.city.name);
};


// function to save the city search history to local storage
let saveSearch = function (city) {
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + city + "'>" + city + "</a>")
    }

    // save the searchHistory array to local storage
    localStorage.setItem("cityWeather", JSON.stringify(searchHistory));

    // save the lastCitySearched to local storage
    localStorage.setItem("previousCity", JSON.stringify(previousCity));

    // display the searchHistory array
    loadSearch();
};

// function to load saved city search history from local storage
let loadSearch = function() {
    searchHistory = JSON.parse(localStorage.getItem("cityWeather"));
    previousCity = JSON.parse(localStorage.getItem("previousCity"));

    // if nothing in localStorage, create an empty searchHistory array and an empty lastCitySearched string
    if (!searchHistory) {
        searchHistory = []
    }

    if (!previousCity) {
        previousCity = ""
    }

    // clear any previous values from search-history ul
    $("#search-history").empty();

    // for loop that will run through all the citys found in the array
    for (i = 0; i < searchHistory.length; i++) {

        // add the city as a link, set it's id, and append it to the search-history ul
        $("#search-history").append("<a href='#' class='list-group-item list-group-item-action' id='" + searchHistory[i] + "'>" + searchHistory[i] + "</a>");
    }
};
loadSearch();

$("#search-history").on("click", function(event){
    // get the links id value
    let lastCity = $(event.target).closest("a").attr("id");
    // pass it's id value to the getCityWeather function
    getWeather(lastCity);
});


// event listener to clear history
$("#clear-btn").on("click", function () {
    localStorage.clear();
    location.reload();
});