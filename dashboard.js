const apiKey = "17a085ac1bb6434fb0745305260107";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");
const weatherDiv = document.getElementById("weather");
const forecastDiv = document.getElementById("forecast");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city name.");
        return;
    }

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;

    try {

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Unable to fetch weather.");
        }

        const data = await response.json();

        displayCurrentWeather(data);

        displayForecast(data.forecast.forecastday);

        changeBackground(data.current.condition.text);

    } catch (error) {

        weatherDiv.innerHTML = "<h3>City not found.</h3>";
        forecastDiv.innerHTML = "";

        console.log(error);

    }

}

function displayCurrentWeather(data) {

    weatherDiv.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>

        <img src="${data.current.condition.icon}" alt="Weather Icon">

        <p><strong>Condition:</strong> ${data.current.condition.text}</p>

        <p><strong>Temperature:</strong> ${data.current.temp_c} °C</p>

        <p><strong>Feels Like:</strong> ${data.current.feelslike_c} °C</p>

        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>

        <p><strong>Wind:</strong> ${data.current.wind_kph} km/h</p>
    `;
}

function displayForecast(forecast) {

    forecastDiv.innerHTML = "";

    forecast.forEach(day => {

        forecastDiv.innerHTML += `

            <div class="forecast-card">

                <h3>${day.date}</h3>

                <img src="${day.day.condition.icon}" alt="Icon">

                <p>${day.day.condition.text}</p>

                <p>Max: ${day.day.maxtemp_c} °C</p>

                <p>Min: ${day.day.mintemp_c} °C</p>

            </div>

        `;

    });

}

function changeBackground(condition) {

    condition = condition.toLowerCase();

    if (condition.includes("sun")) {

        document.body.style.background = "#FFD54F";

    }
    else if (condition.includes("rain")) {

        document.body.style.background = "#81D4FA";

    }
    else if (condition.includes("cloud")) {

        document.body.style.background = "#CFD8DC";

    }
    else {

        document.body.style.background = "#F5F5F5";

    }

}