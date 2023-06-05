feather.replace();
// data -> data returns are unix Timestamps

// data.dt: 1645888976,
// data.sunrise: 1645853361,
// data.sunset: 1645891727,

// data.wheater
// data.wheater.icon = "01d"
// https://openweathermap.org/weather-conditions -> icon-list -> URL is https://openweathermap.org/img/wn/10d@2x.png

// DOM objects
const currentTime = document.getElementById("time");
const day = document.getElementById("day");
const mainWeaterImg = document.getElementById("main-weather-img");
const mainDayDegree = document.getElementById("main-day-degree");
const mainDayInfo = document.getElementById("main-day-info");
const miscData = document.querySelectorAll(".misc-data");
const setData = document.querySelectorAll(".set-data");

// variables
let Weekdays = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
let city = "Växjö";
let key = "0624fd04c06bf97df66d95012813bc7b";
let currentDate = new Date();
let weekday = currentDate.getDay();
console.log(Weekdays[weekday]);

fetch(
	`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
)
	.then((response) => response.json())
	.then((wheaterData) => {
		renderWheaterData(wheaterData);
	});

function renderWheaterData(data) {
	mainWeaterImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	mainDayDegree.innerHTML = Math.round(data.main.temp) + "°";
	let description = document.createElement("p");
	let subDesciption = document.createElement("p");
	miscData[0].innerHTML = data.main.pressure + " hPa";
	miscData[1].innerHTML = data.wind.speed + " m/s";
	miscData[2].innerHTML = data.main.humidity + "%";
	miscData[3].innerHTML = data.visibility / 1000 + " km";
	description.innerHTML = data.weather[0].main;
	subDesciption.innerHTML = data.weather[0].description;
	subDesciption.classList.add("sub-info");
	mainDayInfo.append(description, subDesciption);
	day.innerHTML = Weekdays[weekday];
}
// Eftersom gratisvarianten av OpenWeather inte ger sol-upgång/nedgång så hämtar jag det från en annan API
fetch(
	"https://api.sunrise-sunset.org/json?lat=36.7201600&lng=-4.4203400&date=today"
)
	.then((response) => response.json())
	.then((setDataFetched) => {
		setData[0].innerHTML = setDataFetched.results.sunrise;
		setData[1].innerHTML = setDataFetched.results.sunset;
	});

setInterval(() => {
	clock = new Date();
	hour = clock.getHours();
	min = clock.getMinutes();
	if (hour < 10) {
		hour = "0" + clock.getHours();
	}
	if (min < 10) {
		min = "0" + clock.getMinutes();
	}
	let time = hour + ":" + min;
	currentTime.innerHTML = time;
}, 1000);
