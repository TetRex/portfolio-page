(() => {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");

  // Apply saved theme
  const saved = localStorage.getItem("portfolio_theme");
  let isDark = saved === "dark";
  if (isDark) body.classList.add("dark");

  toggle.addEventListener("click", () => {
    isDark = !isDark;
    body.classList.toggle("dark", isDark);
    localStorage.setItem("portfolio_theme", isDark ? "dark" : "light");
  });

  // Debug log helper — writes timestamped messages to <pre id="output">
  const outputEl = document.getElementById("output");
  function log(message) {
    const time = new Date().toLocaleTimeString();
    outputEl.textContent += `[${time}] ${message}\n`;
  }

  // DOM references for weather display
  const citySpan = document.getElementById("city");
  const tempSpan = document.getElementById("temperature");
  const windSpan = document.getElementById("wind");

  // Fetch weather data from Open-Meteo
  async function fetchWeather(lat, lon, cityName) {
    log(`Fetching weather for ${cityName}…`);
    citySpan.textContent = cityName;
    tempSpan.textContent = "…";
    windSpan.textContent = "…";

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }

      const data = await response.json();
      log(`Response received for ${cityName}`);

      const temp = data.current.temperature_2m;
      const wind = data.current.wind_speed_10m;

      tempSpan.textContent = temp;
      windSpan.textContent = wind;

      log(`${cityName}: ${temp} °C, wind ${wind} km/h`);
    } catch (error) {
      log(`Error: ${error.message}`);
      tempSpan.textContent = "—";
      windSpan.textContent = "—";
    }
  }

  // Attach click handlers to all city buttons
  const buttons = document.querySelectorAll(".city-btn");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lat = btn.dataset.lat;
      const lon = btn.dataset.lon;
      const city = btn.dataset.city;
      fetchWeather(lat, lon, city);
    });
  });

  log("Weather app initialized");
})();
