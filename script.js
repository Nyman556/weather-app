feather.replace();

// example https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&appid={API key} || https://api.openweathermap.org/data/2.5/weather?q=London
// parametrar
// &units=metric
// &appid={API key}

// data -> data returns are unix Timestamps

// data.dt: 1645888976,
// data.sunrise: 1645853361,
// data.sunset: 1645891727,
// data.temp: 22,
// data.feels_like: 18,
// data.humidity: 64,
// data.uvi: 0.06,

// data.visibility
// data.wind_speed

// data.wheater
// data.wheater.main = "Clear"
// data.wheater.description = "clear sky"
// data.wheater.icon = "01d"
// https://openweathermap.org/weather-conditions -> icon-list -> URL is https://openweathermap.org/img/wn/10d@2x.png

// DOM objects
const miscData = document.querySelectorAll(".misc-data");
const mainWeaterImg = document.getElementById("main-weather-img");
const mainDayDegree = document.getElementById("main-day-degree");
const mainDayInfo = document.getElementById("main-day-info");

// variables
let location1 = "Växjö";
let key = "";
let weater;

fetch(
	`http://api.openweathermap.org/data/2.5/weather?q=${location1}&appid=${key}&units=metric`
)
	.then((response) => response.json())
	.then((wheaterData) => {
		console.log(wheaterData);
		weater = wheaterData;
		renderWheaterData(weater);
	});

function renderWheaterData(weater) {
	mainWeaterImg.src = `https://openweathermap.org/img/wn/${weater.weather[0].icon}@2x.png`;
	mainDayDegree.innerHTML = Math.round(weater.main.temp) + "°";
	let description = document.createElement("p");
	let subDesciption = document.createElement("p");
	miscData[0].innerHTML =
		Math.round(weater.main.temp_max) +
		"°" +
		" / " +
		Math.round(weater.main.temp_min) +
		"°";
	miscData[1].innerHTML = weater.wind.speed + " m/s";
	miscData[2].innerHTML = weater.main.humidity + "%";
	miscData[3].innerHTML = Number(weater.visibility) / 100 + "%";
	description.innerHTML = weater.weather[0].main;
	subDesciption.innerHTML = weater.weather[0].description;
	subDesciption.classList.add("sub-info");
	mainDayInfo.append(description, subDesciption);
}

// Math.round()
