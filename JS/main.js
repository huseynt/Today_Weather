const API_key = "21c601c7578a7215f92274299d21e791"
const searchWeather = document.querySelector("#searchWeather")
var city = "baku"

async function fetchWeather (city) {
    const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric&lang=az`)
    const weatherData = await data.json()

    const handleDesc = ()=> {
        return weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1)
    }
    console.log(weatherData)

    document.querySelector("#city").innerText=weatherData.name
    document.querySelector("#mainTemp").innerText=`${weatherData.main.temp}℃`
    document.querySelector("#info").innerText=handleDesc()
    document.querySelector("#minMax").innerText=`Min: ${weatherData.main.temp_min}℃ / Max: ${weatherData.main.temp_max}℃`
    document.querySelector("#humidity").innerText=`Nisbi rütubət: ${weatherData.main.humidity}%`
    document.querySelector("#speed").innerText=`
    Külək sürəti: ${weatherData.wind.speed ? weatherData.wind.speed : "-- "}m/s
    Külək istiqaməti: ${weatherData.wind.deg ? weatherData.wind.deg : "-- "}°
    Atmosfer təzyiqi: ${weatherData.main.pressure ? weatherData.main.pressure : "-- "}hPa`
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

        if(city) {
            document.querySelector("#mekanInfo").innerText="mekan tapıldı"
        }
    }
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    fetchCity(latitude,longitude)
}

function errorCallback(error) {
    alert("Lokasiya məlumatlarının alınmasına icazə verin !");
    document.querySelector("#mekanInfo").innerText="mekan taplmadı";
    document.querySelector("#mekanDot").style.display="none"
};

navigator.geolocation.getCurrentPosition(findGeo,errorCallback);

