const iconElement = document.querySelector('.weather-icon')
const tempElement = document.querySelector('.temperature-value p')
const descElement = document.querySelector('.temperature-description p')
const locationElement = document.querySelector('.location p')
const notificationElement = document.querySelector('.notification')

// app data
const weather = {};
weather.temperature = {
    unit : "celsius"
}

const KELVIN = 273;
const key = 'e5f710d0fdf72a03d54d4290bebaef38';

// check if browser supports location

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showerror)}
else {
     notificationElement.style.display = 'block';
     notificationElement.innerHTML = '<p>Browser do not support</p>'
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

     getWeather(latitude,longitude);
}

function showerror(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `${error.message}`;
}

function getWeather(latitude,longitude) {
    let API = `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`
 console.log(API)
 
        fetch(API)
        .then(function(response) {
            let data = response.json();
            return data;
        })
        .then(function(data) {
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function() {
            displayWeather();
        });
}

function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`
    tempElement.innerHTML = `${weather.temperature.value}- °<span>C</span>`;
    descElement.innerHTML = `${weather.description}`;
    locationElement.innerHTML = `${weather.city},${weather.country}`
}

function celsiusToFahrenheit(temperature) {
    return ((temperature * 9/5) + 32);
}


tempElement.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempElement.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});
