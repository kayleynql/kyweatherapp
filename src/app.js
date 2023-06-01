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

let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSubmit);

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celciusLink= document.querySelector("#celcius-link");
celciusLink.addEventListener("click", displayCelciusTemperature);