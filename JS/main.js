const API_key = "21c601c7578a7215f92274299d21e791"
const searchWeather = document.querySelector("#searchWeather")
var city = "baku"

async function fetchWeather (city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric&lang=en`)
    const weatherData = await data.json()

    document.querySelector("#city").innerText=weatherData.name
    const mainTemp = document.querySelector("#mainTemp").innerText=`${weatherData.main.temp}℃`
    const info = document.querySelector("#info").innerText=weatherData.weather[0].description
    const minMax = document.querySelector("#minMax").innerText=`min: ${weatherData.main.temp_min}℃ / max: ${weatherData.main.temp_max}℃`
    const humidity = document.querySelector("#humidity").innerText=`humidity: ${weatherData.main.humidity}%`
}

searchWeather.addEventListener("keyup", function (e){
    if (e.key=="Enter") {
        fetchWeather(searchWeather.value)
    }
})
fetchWeather(city)






function findGeo(position) {
    async function fetchCity(lat,long) {
        const data = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${long}&localityLanguage=en`)
        const obj = await data.json()
        const city = obj.locality.split(" ")[0]
        fetchWeather(city)
    }
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCity(latitude,longitude)
}

function errorCallback(error) {
    alert("Lokasiya məlumatlarının alınmasına icazə verin");
};

navigator.geolocation.getCurrentPosition(findGeo,errorCallback);

