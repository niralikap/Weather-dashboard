var APIKey = 'd51cf5ae14eae78d7df7e5eb31e4fd8c';
var inputCityFormEl = document.querySelector('#inputCity-form');
var cityNameEl = document.querySelector('#cityname');
var searchCityEl = document.querySelector('#search-city');
//var iconHeaderEl = document.getElementById('icon-header');
var tempDegreeEl = document.querySelector('#temp-degree');
var windVelEl = document.querySelector('#wind-vel');
var humidEl = document.querySelector('#humid');
var uvIndEl = document.querySelector('#uv-ind');
var weatherContainerEl = document.querySelector('#weather-container');
var weatherDt1El = document.querySelector('#weatherDt1');
var weatherDt2El = document.querySelector('#weatherDt2');
var weatherDt3El = document.querySelector('#weatherDt3');
var weatherDt4El = document.querySelector('#weatherDt4');
var weatherDt5El = document.querySelector('#weatherDt5');
var weatherIc1El = document.querySelector('#weatherIc1');
var weatherIc2El = document.querySelector('#weatherIc2');
var weatherIc3El = document.querySelector('#weatherIc3');
var weatherIc4El = document.querySelector('#weatherIc4');
var weatherIc5El = document.querySelector('#weatherIc5');
var weatherT1El = document.querySelector('#weatherT1');
var weatherT2El = document.querySelector('#weatherT2');
var weatherT3El = document.querySelector('#weatherT3');
var weatherT4El = document.querySelector('#weatherT4');
var weatherT5El = document.querySelector('#weatherT5');
var weatherW1El = document.querySelector('#weatherW1');
var weatherW2El = document.querySelector('#weatherW2');
var weatherW3El = document.querySelector('#weatherW3');
var weatherW4El = document.querySelector('#weatherW4');
var weatherW5El = document.querySelector('#weatherW5');
var weatherH1El = document.querySelector('#weatherH1');
var weatherH2El = document.querySelector('#weatherH2');
var weatherH3El = document.querySelector('#weatherH3');
var weatherH4El = document.querySelector('#weatherH4');
var weatherH5El = document.querySelector('#weatherH5');

var searchcity = [];

function formSubmitHandler(event) {
    event.preventDefault();
    var inputCity = cityNameEl.value.trim();
    getCity(inputCity);
    inputCityFormEl.value = '';
  
    if(!searchcity.includes(inputCity)) {
      searchcity.push(inputCity)
  
      addCitiesBtn(cityNameEl.value);
    }
  
  }
  
  function buttonClickHandler(event) {
    event.preventDefault();
    var clickCity = event.target.getAttribute('data-city');
    console.log(clickCity)
    getCity(clickCity);
    
  }


function getCity (cityName) {
  var cityURL = 
  "https://api.openweathermap.org/geo/1.0/direct?q="+ cityName + "&appid=" + APIKey;
  fetch(cityURL)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data);
      getForecast(data[0].lat, data[0].lon, cityName)
    })
}

function getForecast(lat,lon, cityName) {
  var oneCallURL = 
  "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + APIKey;
  
  fetch(oneCallURL)
    .then(function (response) {
      if (response.ok) {
        return response.json()
      }
    })
    .then(function (data) {
      console.log(data);
      var current = {
        searchCity: cityName,
        Date: data.current.dt,
        Icon: data.current.weather[0].icon,
        Temp: data.current.temp,
        Wind: data.current.wind_speed,
        Humid: data.current.humidity,
        UVI: data.current.uvi,

        Date1: data.daily[1].dt,
        Icon1: data.daily[1].weather[0].icon,
        Temp1: data.daily[1].temp.day,
        Wind1: data.daily[1].wind_speed,
        Humid1: data.daily[1].humidity,

        Date2: data.daily[2].dt,
        Icon2: data.daily[2].weather[0].icon,
        Temp2: data.daily[2].temp.day,
        Wind2: data.daily[2].wind_speed,
        Humid2: data.daily[2].humidity,

        Date3: data.daily[3].dt,
        Icon3: data.daily[3].weather[0].icon,
        Temp3: data.daily[3].temp.day,
        Wind3: data.daily[3].wind_speed,
        Humid3: data.daily[3].humidity,

        Date4: data.daily[4].dt,
        Icon4: data.daily[4].weather[0].icon,
        Temp4: data.daily[4].temp.day,
        Wind4: data.daily[4].wind_speed,
        Humid4: data.daily[4].humidity,

        Date5: data.daily[5].dt,
        Icon5: data.daily[5].weather[0].icon,
        Temp5: data.daily[5].temp.day,
        Wind5: data.daily[5].wind_speed,
        Humid5: data.daily[5].humidity,
      };
      localStorage.setItem('current', JSON.stringify(current));
      renderCurrentDay();
    })
}
function addCitiesBtn (city) {
    var citynameBtn = document.createElement('button');
    var btnText = document.createTextNode(city);
    citynameBtn.setAttribute('class','cityName');
    citynameBtn.setAttribute('data-city', city);
    citynameBtn.appendChild(btnText);
    weatherContainerEl.appendChild(citynameBtn);
  }
  
function renderCurrentDay() {
  var lastItem = JSON.parse(localStorage.getItem('current'));
  var dateT = moment.unix(lastItem.Date).format("MM/DD/YYYY");
  var dateT1 = moment.unix(lastItem.Date1).format("MM/DD/YYYY");
  var dateT2 = moment.unix(lastItem.Date2).format("MM/DD/YYYY");
  var dateT3 = moment.unix(lastItem.Date3).format("MM/DD/YYYY");
  var dateT4 = moment.unix(lastItem.Date4).format("MM/DD/YYYY");
  var dateT5 = moment.unix(lastItem.Date5).format("MM/DD/YYYY");
  var WIcon = document.createElement('img');
  var iconURL = `https://openweathermap.org/img/wn/${lastItem.Icon}@2x.png`;
  WIcon.setAttribute('src', iconURL);
  var WIcon1 = document.createElement('img');
  var iconURL1 = `https://openweathermap.org/img/wn/${lastItem.Icon1}@2x.png`;
  WIcon1.setAttribute('src', iconURL1);
  var WIcon2 = document.createElement('img');
  var iconURL2 = `https://openweathermap.org/img/wn/${lastItem.Icon2}@2x.png`;
  WIcon2.setAttribute('src', iconURL2);
  var WIcon3 = document.createElement('img');
  var iconURL3 = `https://openweathermap.org/img/wn/${lastItem.Icon3}@2x.png`;
  WIcon3.setAttribute('src', iconURL3);
  var WIcon4 = document.createElement('img');
  var iconURL4 = `https://openweathermap.org/img/wn/${lastItem.Icon4}@2x.png`;
  WIcon4.setAttribute('src', iconURL4);
  var WIcon5 = document.createElement('img');
  var iconURL5 = `https://openweathermap.org/img/wn/${lastItem.Icon5}@2x.png`;
  WIcon5.setAttribute('src', iconURL5);
 
  if (lastItem !== null) {
    /* Display current Date*/
    searchCityEl.textContent = lastItem.searchCity + ' (' + dateT + ') ';
    searchCityEl.appendChild(WIcon);
    tempDegreeEl.textContent = 'Temp: '+ lastItem.Temp + '°F';
    windVelEl.textContent = 'Wind: '+ lastItem.Wind + ' MPH';
    humidEl.textContent = 'Humidity: '+ lastItem.Humid + ' %';
    uvIndEl.innerHTML = 'UV Index: <span id="span"> '+ lastItem.UVI + ' </span>';
    if (lastItem.UVI < 3) {
      document.querySelector('span').style.backgroundColor = 'green';
    } else if (lastItem.UVI < 6) {
      document.querySelector('span').style.backgroundColor = 'orange';
    } else {
      document.querySelector('span').style.backgroundColor = 'red';
    }

    
    weatherDt1El.textContent = dateT1;
    weatherIc1El.textContent = "";
    weatherIc1El.appendChild(WIcon1);
    weatherT1El.textContent = 'Temp: '+ lastItem.Temp1 + '°F';
    weatherW1El.textContent = 'Wind: '+ lastItem.Wind1 + ' MPH';
    weatherH1El.textContent = 'Humidity: '+ lastItem.Humid1 + ' %';

    
    weatherDt2El.textContent = dateT2;
    weatherIc2El.textContent = "";
    weatherIc2El.appendChild(WIcon2);
    weatherT2El.textContent = 'Temp: '+ lastItem.Temp2 + '°F';
    weatherW2El.textContent = 'Wind: '+ lastItem.Wind2 + ' MPH';
    weatherH2El.textContent = 'Humidity: '+ lastItem.Humid2 + ' %';

    
    weatherDt3El.textContent = dateT3;
    weatherIc3El.textContent = "";
    weatherIc3El.appendChild(WIcon3);
    weatherT3El.textContent = 'Temp: '+ lastItem.Temp3 + '°F';
    weatherW3El.textContent = 'Wind: '+ lastItem.Wind3 + ' MPH';
    weatherH3El.textContent = 'Humidity: '+ lastItem.Humid3 + ' %';

    
    weatherDt4El.textContent = dateT4;
    weatherIc4El.textContent = "";
    weatherIc4El.appendChild(WIcon4);
    weatherT4El.textContent = 'Temp: '+ lastItem.Temp4 + '°F';
    weatherW4El.textContent = 'Wind: '+ lastItem.Wind4 + ' MPH';
    weatherH4El.textContent = 'Humidity: '+ lastItem.Humid4 + ' %';

    
    weatherDt5El.textContent = dateT5;
    weatherIc5El.textContent = "";
    weatherIc5El.appendChild(WIcon5);
    weatherT5El.textContent = 'Temp: '+ lastItem.Temp5 + '°F';
    weatherW5El.textContent = 'Wind: '+ lastItem.Wind5 + ' MPH';
    weatherH5El.textContent = 'Humidity: '+ lastItem.Humid5 + ' %';
  } else {
    return;
  }
}



inputCityFormEl.addEventListener('submit', formSubmitHandler);
weatherContainerEl.addEventListener('click', buttonClickHandler);

renderCurrentDay();