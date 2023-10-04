import './style.css';

const container = document.getElementById('container');
const contentContainer = document.createElement('div');
contentContainer.classList.add('form-div');
const formDiv = document.createElement('form');
formDiv.classList.add('form-cont');

function takeInput() {
  formDiv.innerHTML = `
    <label for="location">Enter the Location to get weather</label><br><br>
    <input id='location' type="text" required><br><br>
    <input type="submit">
  `;
  contentContainer.appendChild(formDiv);
  container.appendChild(contentContainer);
}
takeInput();

// fetch the weather api and console.log it
function renderDiv(weatherData) {
  const getLocation = document.getElementById('location').value;
  const showTempDiv = document.createElement('div');
  showTempDiv.classList.add('show-temp-div');

  showTempDiv.innerText = `Your current weather in ${getLocation} is ${weatherData.current.temp_c}`;
  contentContainer.appendChild(showTempDiv);
}

async function getWeather() {
  const getLocation = document.getElementById('location').value;
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=10d8920911ff496591871009231009&q=${getLocation}`, { mode: 'cors' });
    const weatherData = await response.json();
    renderDiv(weatherData);
  } catch (err) {
    // eslint-disable-next-line no-alert
    alert('Enter a valid place');
  }
}

formDiv.addEventListener('submit', (e) => {
  e.preventDefault();
  getWeather();
});
