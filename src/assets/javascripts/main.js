import updateDate from "./date";
import darkModeEvent from "./darkmode";

const weatherApp = document.getElementById("weatherApp");
const weatherInput = weatherApp.querySelector(".weatherInput");
const searchBtn = weatherInput.querySelector(".input-search-btn");
const searchInput = weatherInput.querySelector("#input-search");
const errorMessage = weatherInput.querySelector(".weatherInput__error-message");

const loadingIcon = weatherInput.querySelector(".weatherInput__loading-icon");
const animationEle = loadingIcon.querySelector("animateTransform");

const weatherOutput = weatherApp.querySelector(".weatherOutput");
const cityName = weatherOutput.querySelector(".name");
const countryName = weatherOutput.querySelector(".location__country");
const weatherTemperatureEle = weatherOutput.querySelector(
  ".weatherInfo__temperature",
);
const temperature = weatherOutput.querySelector(
  ".weatherInfo__temperature-number",
);
const unit = weatherOutput.querySelector(".unit");
const precipitation = weatherOutput.querySelector(".precipitation");
const humidity = weatherOutput.querySelector(".humidity");
const wind = weatherOutput.querySelector(".wind");
const weatherCondition = weatherOutput.querySelector(
  ".weatherInfo__weatherCondition",
);

const switchUnitBtn = weatherOutput.querySelector(".checkbox");

const baseUrl =
  "https://api.weatherapi.com/v1/current.json?key=ae202e48989e44c6beb103755232712&q=";
let currentWeather = {};

function updateWeather(responseData) {
  cityName.textContent = responseData.location.name;
  countryName.textContent = responseData.location.country;

  temperature.textContent = switchUnitBtn.checked
    ? (+responseData.current.temp_f).toFixed(0)
    : (+responseData.current.temp_c).toFixed(0);
  unit.textContent = switchUnitBtn.checked ? "F" : "C";

  precipitation.textContent = responseData.current.precip_mm;
  humidity.textContent = responseData.current.humidity;
  wind.textContent = ((+responseData.current.wind_kph * 1000) / 3600).toFixed(
    0,
  );
  weatherCondition.textContent = responseData.current.condition.text;
}

async function fetchWeatherInfo(url) {
  try {
    loadingIcon.classList.add("weatherInput__loading-icon--active");
    animationEle.beginElement();
    const response = await fetch(url, { mode: "cors" });
    if (!response.ok) {
      throw new Error("Can not find the location");
    }
    const responseData = await response.json();
    currentWeather = responseData;
    updateWeather(responseData);
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    loadingIcon.classList.remove("weatherInput__loading-icon--active");
  }
}

function updateUI() {
  searchInput.value = searchInput.value.trim();
  const textInput = searchInput.value;
  if (textInput) {
    const url =
      "https://api.weatherapi.com/v1/current.json?key=ae202e48989e44c6beb103755232712&q=".concat(
        textInput,
      );
    fetchWeatherInfo(url);
    searchInput.value = "";
    if (errorMessage.textContent !== "") {
      errorMessage.textContent = "";
    }
  }
}

function changeUnit() {
  temperature.textContent = switchUnitBtn.checked
    ? (+currentWeather.current.temp_f).toFixed(0)
    : (+currentWeather.current.temp_c).toFixed(0);
  unit.textContent = switchUnitBtn.checked ? "F" : "C";
  weatherTemperatureEle.classList.toggle(
    "weatherInfo__temperature--fahrenheit",
  );
}

export default function initate() {
  updateDate();
  darkModeEvent();
  fetchWeatherInfo(baseUrl.concat("hanoi"));

  searchBtn.addEventListener("click", () => {
    updateUI();
  });

  weatherInput.addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
      updateUI();
    }
  });

  switchUnitBtn.addEventListener("click", changeUnit);
}
