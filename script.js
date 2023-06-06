// refreshes Icons
feather.replace();

// DOM objects
const timestamp = document.getElementById("update-timestamp");
const currentTime = document.getElementById("time");
const day = document.getElementById("day");
const mainWeaterImg = document.getElementById("main-weather-img");
const mainDayDegree = document.getElementById("main-day-degree");
const mainDaymaxMix = document.getElementById("max-min");
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
let key = "0624fd04c06bf97df66d95012813bc7b";
let currentDate = new Date();
let weekday = currentDate.getDay();
let date;
let clockTime;

function fetchWeatherData() {
	fetch(
		`http://api.openweathermap.org/data/2.5/weather?q=Växjö&appid=${key}&units=metric`
	)
		.then((response) => response.json())
		.then((weatherData) => {
			renderWeaterData(weatherData);
		});

	// fetch sunrise/sunset
	fetch(
		"https://api.sunrise-sunset.org/json?lat=56.87767&lng=14.80906&date=today"
	)
		.then((response) => response.json())
		.then((setDataFetched) => {
			setData[0].innerHTML = setDataFetched.results.sunrise;
			setData[1].innerHTML = setDataFetched.results.sunset;
		});
}

function renderWeaterData(data) {
	//temp section
	mainWeaterImg.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
	mainDayDegree.innerHTML = Math.round(data.main.temp) + "°";
	mainDaymaxMix.innerHTML =
		Math.round(data.main.temp_max) +
		"°" +
		" | " +
		Math.floor(data.main.temp_min) +
		"°";

	//Description section
	let description = document.createElement("p");
	let subDesciption = document.createElement("p");
	description.innerHTML = data.weather[0].main;
	subDesciption.innerHTML = data.weather[0].description;
	subDesciption.classList.add("sub-info");
	mainDayInfo.innerHTML = "";
	mainDayInfo.append(description, subDesciption);

	// Timestamp
	timestamp.innerHTML = "Last Updated: " + getDate();

	// updates time and date once here then in interval
	currentTime.innerHTML = getDate();
	day.innerHTML = getDate(1) + " | " + Weekdays[weekday];

	// array of DOM cards for [pressure, wind, humidity, visiblity]
	miscData[0].innerHTML = data.main.pressure + " hPa";
	miscData[1].innerHTML = data.wind.speed + " m/s";
	miscData[2].innerHTML = data.main.humidity + "%";
	miscData[3].innerHTML = data.visibility / 1000 + " km";
}

// function to get date or clock depending on if there is an input
function getDate(x) {
	let date = new Date();
	if (x) {
		let year = date.getFullYear();
		let month = date.getMonth();
		let day = date.getDate();
		if (month < 10) {
			month = "0" + date.getMonth();
		}
		if (day < 10) {
			day = "0" + date.getDate();
		}
		return (date = year + "-" + month + "-" + day);
	} else {
		let hour = date.getHours();
		let min = date.getMinutes();
		if (hour < 10) {
			hour = "0" + date.getHours();
		}
		if (min < 10) {
			min = "0" + date.getMinutes();
		}
		return (clockTime = hour + ":" + min);
	}
}

// Intervals
//Updates time and date every second
setInterval(() => {
	currentTime.innerHTML = getDate();
	day.innerHTML = getDate(1) + " | " + Weekdays[weekday];
}, 1000);

// updates all data every 15 min
setInterval(() => {
	fetchWeatherData();
}, 1000 * 60 * 15);

// updates all data on load
fetchWeatherData();
