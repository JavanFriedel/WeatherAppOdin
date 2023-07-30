import './style.css';

async function getWeatherData(location) {
  const response = fetch(
    `https://api.weatherapi.com/v1/current.json?key=8314964fd0a54271b1d185503232907&q=${location}`
  );

  const responseJSON = (await response).json();
  return responseJSON;
}

async function getBackgroundImage(query) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos/?client_id=QV2r5kylpOxHMV2-_OdVxqcXI7_M0GdqQeLUqUKU7IU&query=${query}`
  );

  const wallpapers = await response.json();

  return wallpapers.results[0].urls.regular;
}

async function showNewBackground(weatherType) {
  const image = await getBackgroundImage(weatherType);

  document.body.style.backgroundImage = `url(${image})`;
}

async function showNewWeather(input) {
  const weatherDisplayDiv = document.querySelector('#WeatherDisplay');
  const weatherDisplay = document.querySelector('#cityWeather');
  const cityDisplay = document.querySelector('#cityTitle');

  const data = await getWeatherData(input);

  // console.log('Weather Data: ', data);

  cityDisplay.innerText = data.location.name;
  weatherDisplay.innerText = data.current.condition.text;

  weatherDisplayDiv.className = 'flex';

  return data.current.condition.text;
}

async function updateDisplay() {
  const input = document.querySelector('#locationInput');

  const weatherData = await showNewWeather(input.value);
  const backgroundChange = await showNewBackground(weatherData);
}

const button = document.querySelector('#getWeatherBtn');
button.addEventListener('click', () => {
  updateDisplay();
});

const inputBtn = document.querySelector('input');
inputBtn.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    updateDisplay();
  }
});
