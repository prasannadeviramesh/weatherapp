async function getWeather() {
  const cityInput = document.getElementById('city-input');
  const city = cityInput.value.trim();

  if (!city) {
    alert("Please enter a city name");
    return;
  }

  const apiKey = '9fc4f2a171d5b124c1f6d55445a1f52e';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      document.getElementById('weather-result').innerHTML = `
        <h3 style="font-weight:bold; font-size:1.6rem;">${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Description: ${data.weather[0].description}</p>
      `;
    } else {
      document.getElementById('weather-result').innerHTML =
        `<p>City not found. Please try again.</p>`;
    }
  } catch (error) {
    document.getElementById('weather-result').innerHTML =
      `<p>Unable to fetch data. Please check your network.</p>`;
  }
}

/* 👇 Automatically run when user presses Enter key */
document.getElementById('city-input').addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    getWeather();
  }
});
