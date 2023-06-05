feather.replace();
// data -> data returns are unix Timestamps

// data.dt: 1645888976,
// data.sunrise: 1645853361,
// data.sunset: 1645891727,

// data.wheater
// data.wheater.icon = "01d"
// https://openweathermap.org/weather-conditions -> icon-list -> URL is https://openweathermap.org/img/wn/10d@2x.png

// DOM objects
const miscData = document.querySelectorAll(".misc-data");
const setData = document.querySelectorAll(".set-data");
const mainWeaterImg = document.getElementById("main-weather-img");
const mainDayDegree = document.getElementById("main-day-degree");
const mainDayInfo = document.getElementById("main-day-info");

// variables
let location1 = "Växjö";
let key = "0624fd04c06bf97df66d95012813bc7b";

fetch(
	`http://api.openweathermap.org/data/2.5/weather?q=${location1}&appid=${key}&units=metric`
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
	miscData[3].innerHTML = Number(data.visibility) / 1000 + " km";
	description.innerHTML = data.weather[0].main;
	subDesciption.innerHTML = data.weather[0].description;
	subDesciption.classList.add("sub-info");
	mainDayInfo.append(description, subDesciption);
	let d = new Date(data.dt * 1000);
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

let a;
let time;
setInterval(() => {
	clock = new Date();
	time = clock.getHours() + ":" + clock.getMinutes();
	document.getElementById("time").innerHTML = time;
}, 1000);
