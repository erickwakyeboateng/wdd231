import { getMembershipLevel, setupNavigation, showFooterDates } from "./modules.mjs";

const apiKey = "3ee44df2a1600b010263f5101b1d44b3";
const lat = "5.5841";
const lon = "-0.1444";
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const currentWeather = document.querySelector("#current-weather");
const forecast = document.querySelector("#forecast");
const spotlightContainer = document.querySelector("#spotlight-container");

async function getWeatherData() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();

    currentWeather.innerHTML = `
      <p><strong>Temperature:</strong> ${Math.round(data.main.temp)}&deg;C</p>
      <p><strong>Condition:</strong> ${data.weather[0].description}</p>
    `;
  } catch (error) {
    console.error("Error fetching weather:", error);
    currentWeather.innerHTML = "<p>Weather information is not available.</p>";
  }
}

async function getForecast() {
  try {
    const response = await fetch(forecastUrl);
    const data = await response.json();

    const dailyForecasts = data.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    forecast.innerHTML = "";

    dailyForecasts.forEach((day) => {
      const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
        weekday: "long",
      });

      forecast.innerHTML += `
        <p><strong>${date}:</strong> ${Math.round(day.main.temp)}&deg;C</p>
      `;
    });
  } catch (error) {
    console.error("Error fetching forecast:", error);
    forecast.innerHTML = "<p>Forecast information is not available.</p>";
  }
}

async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();

    const eligible = data.members.filter((member) => member.membershipLevel >= 2);

    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, 3);

    spotlightContainer.innerHTML = "";

    selected.forEach((member) => {
      spotlightContainer.innerHTML += `
        <section class="spotlight-card">
          <img src="images/${member.image}" alt="${member.name} logo" loading="lazy">
          <h3>${member.name}</h3>
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
          <p><strong>Membership:</strong> ${getMembershipLevel(member.membershipLevel)}</p>
        </section>
      `;
    });
  } catch (error) {
    console.error("Error fetching spotlights:", error);
    spotlightContainer.innerHTML = "<p>Spotlights are not available.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  setupNavigation();
  showFooterDates();
  getWeatherData();
  getForecast();
  getSpotlights();
});
