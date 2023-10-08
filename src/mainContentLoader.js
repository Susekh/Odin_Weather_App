function mainConentLoader() {
  const container = document.getElementById('container');
  const contentContainer = document.createElement('div');
  contentContainer.classList.add('content-container-div');
  const lContent = document.createElement('div');
  lContent.classList.add('left-content');
  const formInput = document.createElement('form');
  formInput.classList.add('form-cont');
  const showTempDiv = document.createElement('div');
  showTempDiv.classList.add('show-temp-div');
  showTempDiv.innerHTML = '<p>Enter you location to get the details here.</p>';
  // geographical details

  const geoLoaderDiv = document.createElement('div');
  geoLoaderDiv.classList.add('geoLoaderStyle');
  geoLoaderDiv.innerHTML = 'Data related to location will be here';

  function takeInput() {
    formInput.innerHTML = `
    <label for="location">Enter the Location to get weather</label><br><br>
    <input id='location' type="text" required><br><br>
    <input class="submit-btn" type="submit">
  `;
    lContent.append(formInput, geoLoaderDiv);
    contentContainer.appendChild(lContent);
    container.appendChild(contentContainer);
  }
  takeInput();
  // adding the div to show the temp details
  contentContainer.appendChild(showTempDiv);

  // fetch the weather api and console.log it
  function renderShowTempDiv(weatherData) {
    const showTemp = document.createElement('div');
    const imageVar = document.createElement('img');
    imageVar.classList.add('showContImg');
    imageVar.src = `${weatherData.current.condition.icon}`;
    showTemp.classList.add('show-temp');
    showTempDiv.innerHTML = '';
    showTemp.innerHTML = `<p>Temp in celsius = ${weatherData.current.temp_c} °c<br>
                             <br> Temp in fahrenheit = ${weatherData.current.temp_f} °F<br>
                             <br>Fells like in celsius = ${weatherData.current.feelslike_c} °c<br>
                             <br>Fells like in fahrenheit = ${weatherData.current.feelslike_c} °F<br>
                             <br>Wind = ${weatherData.current.wind_kph}kph<br>
                             <br>Wind direction = ${weatherData.current.wind_dir}<br>
                             <br>Gust = ${weatherData.current.gust_kph}kph<br> 
                             <br>Condition = ${weatherData.current.condition.text}<br><br></p>`;

    showTemp.appendChild(imageVar);
    showTempDiv.appendChild(showTemp);
  }

  function renderGeoLoader(weatherData) {
    const showLocation = document.createElement('div');
    showLocation.classList.add('showLocationStyle');
    geoLoaderDiv.innerHTML = '';

    showLocation.innerHTML = `<h3>${weatherData.location.name}</h3>
                              <p>Region: ${weatherData.location.region}<br>
                              Country: ${weatherData.location.country}<br>
                              Lattitude: ${weatherData.location.lat}<br>
                              Locat Time: ${weatherData.location.localtime}</p>`;

    geoLoaderDiv.appendChild(showLocation);
  }

  async function getWeather() {
    const getLocation = document.getElementById('location').value;
    try {
      const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=10d8920911ff496591871009231009&q=${getLocation}`, { mode: 'cors' });
      const weatherData = await response.json();
      renderShowTempDiv(weatherData);
      renderGeoLoader(weatherData);
    } catch (err) {
    // eslint-disable-next-line no-alert
      alert('Enter a valid place');
    }
  }

  formInput.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather();
  });
}

export default mainConentLoader;
