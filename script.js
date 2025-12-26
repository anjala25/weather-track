function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const weatherResult = document.getElementById("weatherResult");

    if (city === "") {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }

    // Step 1: Get latitude & longitude
    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`)
        .then(response => response.json())
        .then(locationData => {
            if (!locationData.results) {
                weatherResult.innerHTML = "City not found.";
                return;
            }

            const lat = locationData.results[0].latitude;
            const lon = locationData.results[0].longitude;

            // Step 2: Get weather data
            return fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
            );
        })
        .then(response => response.json())
        .then(weatherData => {
            const temp = weatherData.current_weather.temperature;
            const wind = weatherData.current_weather.windspeed;

            weatherResult.innerHTML = `
                <p><strong>City:</strong> ${city}</p>
                <p><strong>Temperature:</strong> ${temp} °C</p>
                <p><strong>Wind Speed:</strong> ${wind} km/h</p>
            `;
        })
        .catch(() => {
            weatherResult.innerHTML = "Error fetching weather data.";
        });
}
