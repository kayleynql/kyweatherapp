function formatDate(timestamp){
    let date = new Date (timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`};
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`};
    let days =["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    let day = days[date.getDay()]; 
    return `${day} ${hours}: ${minutes}`
}

function displayForecast() {
let forecastElement = document.querySelector("#forecast");

let forecastHTML = `<div class="row">`;
let days = ["Thu", "Fri", "Sat", "Sun"];
days.forEach(function(day){   
forecastHTML = 
forecastHTML +
` 
<div class="col-2">
  <div class="weather-forecast-date">
  ${day}
</div>
  <img
  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII="
  alt=""
  width="36"/>
  <div class="weather-forecast-temperature">
  <span class="weather-forecast-temperature-max"> 18° </span> 
  <span class="weather-forecast-temperature-min"> 12° </span>  
</div>
</div>`;
});

forecastHTML= forecastHTML + `</div>`;
forecastElement.innerHTML=forecastHTML
}

function displayTemperature(response) {
    let temperatureElement= document.querySelector("#temperature");
    celsiusTemperature = response.data.main.temp;
    temperatureElement.innerHTML= Math.round(celsiusTemperature);
    let cityElement=document.querySelector("#city");
    cityElement.innerHTML= response.data.name;
    let descriptionElement=document.querySelector("#description");
    descriptionElement.innerHTML= response.data.weather[0].description;
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML= response.data.main.humidity;
    let windElement=document.querySelector("#wind");
    windElement.innerHTML= Math.round(response.data.wind.speed);
    let dateElement=document.querySelector("#date");
    dateElement.innerHTML= formatDate(response.data.dt*1000);
    let iconElement=document.querySelector("#icon");
    iconElement.setAttribute("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute("alt",`https://openweathermap.org/img/wn/${response.data.weather[0].description}@2x.png`);


}
function search (city){
    let apiKey = "ed238469f9b5e9d801834270e65449bc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

function displayFahrenheitTemperature (event) {
    event.preventDefault();
    let FahrenheitTemperature = (celsiusTemperature * 9/5) + 32;
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    temperatureElement.innerHTML=Math.round(FahrenheitTemperature)
}

function displayCelciusTemperature (event) {
    event.preventDefault();
    let CelciusTemperature = celsiusTemperature;
    let temperatureElement = document.querySelector("#temperature");
    celciusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    temperatureElement.innerHTML=Math.round(celsiusTemperature)
}

let celsiusTemperate = null

displayForecast();

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink= document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);