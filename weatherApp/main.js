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
  console.log('response:', response);

  const wallpapers = await response.json();
  console.log('Wallpapers: ', wallpapers);

  return wallpapers.results[0].urls.regular;
}

async function showNewBackground() {
  const input = document.querySelector('#locationInput');
  const image = await getBackgroundImage(input.value);

  document.body.style.backgroundImage = `url(${image})`;
}

async function showNewWeather() {
  const input = document.querySelector('#locationInput');
  const displayWeather = document.querySelector('#WeatherDisplay');

  const data = await getWeatherData(input.value);

  displayWeather.innerText = data.current.condition.text;

  // console.log(data);
}

const button = document.querySelector('#getWeatherBtn');
button.addEventListener('click', () => {
  showNewBackground();
});
