import './style.css';

const formDiv = document.createElement('form');

function takeInput() {
  const container = document.getElementById('container');

  formDiv.innerHTML = `
    <label for="location">Enter the Location to get weather</label>
    <input id='location' type="text">
    <input type="submit">
  `;

  container.appendChild(formDiv);
}
takeInput();

// fetch the weather api and console.log it

async function getWeather() {
  const getLocation = document.getElementById('location').value;

  const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=10d8920911ff496591871009231009&q=${getLocation}`, { mode: 'cors' });
  const weatherData = await response.json();
  console.log(weatherData.current.temp_c);
}

formDiv.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather();
});
