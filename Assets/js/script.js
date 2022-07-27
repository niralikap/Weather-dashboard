var userFormEl = document.querySelector('#user-form');
var APIKey = 'd51cf5ae14eae78d7df7e5eb31e4fd8c';
var city;
var state;
var country;
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
var cityInputEl = document.querySelector('#cityname');
var SearchCityEl = document.querySelector('#search-city');
var weatherContainerEl = document.querySelector('#weather-container');
var cityButtonsEl = document.querySelector('#city-buttons');
var cityNameEl = document.querySelector('#city-name');
var dateWeatherEl = document.querySelector('#date-weather');
var dateW = moment().format("MM/DD/YY");
dateWeatherEl.text = dateW;

 /* fetch(queryURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    // Use the console to examine the response
    console.log(data);
    // TODO: Loop through the data and generate your HTML
    for(var i=0; i<5; i++){
      console.log(data[i].temp);
      console.log(data[i].wind);
      console.log(data[i].humidity);
      console.log(data[i].all);
      var cityName = document.createElement('h3');
      var temperature = document.createElement('p');
      var wind = document.createElement('p');
      var humid = document.createElement('p');
      var uvIndex = document.createElement('p');
      cityName.textContent = data[i].name;
      temperature.textContent = data[i].temp;
      wind.textContent = data[i].wind;
      humid.textContent = data[i].humidity;
      uvIndex.textContent = data[i].all;
      weatherContainerEl.append(cityName);
      weatherContainerEl.append(temperature);
      weatherContainerEl.append(wind);
      weatherContainerEl.append(humid);
      weatherContainerEl.append(uvIndex);
    }
  });*/
 
  var formSubmitHandler = function (event) {
    event.preventDefault();
  
    var cityname1 = cityInputEl.value.trim();
  
    if (cityname1) {
      displayWeather(cityname1);
  
      weatherContainerEl.textContent = '';
      cityInputEl.value = '';
    } else {
      alert('Please enter a city name');
    }
  };
  var buttonClickHandler = function (event) {
    var cities = event.target.getAttribute('data-city');
  
    if (cities) {
      displayWeather(cities);
  
      weatherContainerEl.textContent = '';
    }
  };
  
  var getUserCities = function (city) {
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    fetch(queryURL)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayWeather(data, user);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to GitHub');
      });
  };

  var getFeaturedCities = async function (city) {
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
  
    var getInfo = await fetch(apiUrl).then(function (response) {
      if (response.ok) {
        return response.json();
        
      } else {
        alert('Error: ' + response.statusText);
      }
    });
    return getInfo;
    displayWeather(getInfo, city);

  };

  var displayWeather = async function (searchCity) {
    var data = await getFeaturedCities(searchCity); 
   /* if (city.length === 0) {
      repoContainerEl.textContent = 'No cities found.';
      return;
    }*/
  console.log(data);
    cityNameEl.textContent = searchCity;
  
    //console.log(data);
    // TODO: Loop through the data and generate your HTML
    //for(var i=0; i<5; i++){
      console.log(data.main.temp);
      console.log(data.wind.speed);
      console.log(data.main.humidity);
      console.log(data.clouds.all);
      var cityName = document.createElement('h3');
      var temperature = document.createElement('p');
      var wind = document.createElement('p');
      var humid = document.createElement('p');
      var uvIndex = document.createElement('p');
      cityName.textContent = data.name;
      temperature.textContent = "Temp: " + data.main.temp + "F";
      wind.textContent = "Wind: " + data.wind.speed + "MPH";
      humid.textContent = "Humidity: " + data.main.humidity + "%";
      uvIndex.textContent = "UV Index: " + data.clouds.all;
      weatherContainerEl.append(dateW);
      //weatherContainerEl.append(cityName);
      weatherContainerEl.append(temperature);
      weatherContainerEl.append(wind);
      weatherContainerEl.append(humid);
      weatherContainerEl.append(uvIndex);
    /*for (var i = 0; i < city.length; i++) {
      var cityName = city[i].name.login + '/' + repos[i].name;
  
      var repoEl = document.createElement('a');
      repoEl.classList = 'list-item flex-row justify-space-between align-center';
      repoEl.setAttribute('href', './single-repo.html?repo=' + repoName);
  
      var titleEl = document.createElement('span');
      titleEl.textContent = repoName;
  
      repoEl.appendChild(titleEl);
  
      var statusEl = document.createElement('span');
      statusEl.classList = 'flex-row align-center';
  
      if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
          "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
  
      repoEl.appendChild(statusEl);
  
      repoContainerEl.appendChild(repoEl);*/
    };
  userFormEl.addEventListener('search', formSubmitHandler);
  cityButtonsEl.addEventListener('click', buttonClickHandler);