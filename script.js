const input = document.querySelector('input');
const button = document.querySelector('button');
const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';

const API_KEY = '&appid=1a8fea21532476d42173b6d99709c43f';
const API_UNITS = '&units=metric';

const getWeather = () => {
	const city = input.value || 'Katowice';
	const URL = API_LINK + city + API_KEY + API_UNITS;

	axios
    .get(URL)
    .then(res => {
		console.log(res.data);
		const temp = res.data.main.temp;
		const hum = res.data.main.humidity;
		const status = Object.assign({}, ...res.data.weather);


		cityName.textContent = res.data.name;
		temperature.textContent = Math.floor(temp) + '°C';
		humidity.textContent = hum + '%';
		weather.textContent = status.main;

        warning.textContent = ''
        input.value = ''

        if (status.id >= 200 && status.id < 300) {
            photo.setAttribute('src', './img/thunderstorm.png')
        }
        if (status.id >= 300 && status.id < 400) {
            photo.setAttribute('src', './img/drizzle.png')
        }
        if (status.id >= 400 && status.id < 500) {
            photo.setAttribute('src', './img/rain.png')
        }
        if (status.id >= 600 && status.id < 700) {
            photo.setAttribute('src', './img/ice.png')
        }
        if (status.id >= 700 && status.id < 800) {
            photo.setAttribute('src', './img/fog.png')
        }
        if (status.id === 800) {
            photo.setAttribute('src', './img/sun.png')
        }
        if (status.id > 800 && status.id < 900) {
            photo.setAttribute('src', './img/cloud.png')
        } else {
            photo.setAttribute('src', './img/unknown.png')
        }
	})
    .catch(() => (warning.textContent = 'Wpisz poprawne miasto'))
    
};

const enterKeyCheck = (e) => {
    if(e.key === 'Enter') {
        getWeather()
    }
}

// getWeather();
button.addEventListener('click', getWeather);
input.addEventListener('keyup', enterKeyCheck)
