import axios from "axios";

const getWeather = (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER}`;
  return axios.get(url).then((response) => response.data);
};

// get today's rainfall and temperature from the results of getWeather
const getRainfall = (weatherData) =>
  weatherData.rain ? weatherData.rain["1h"] : 0;

const getTemperature = (weatherData) => weatherData.main.temp;

const getWind = (weatherData) => weatherData.wind.speed;

const getCurrentWeather = (weatherData) => weatherData.weather[0];

const getWeatherObject = (lat, long) => {
  return getWeather(lat, long).then((weatherData) => {
    return {
      temperature: getTemperature(weatherData),
      rainfall: getRainfall(weatherData),
      wind: getWind(weatherData),
      current: getCurrentWeather(weatherData),
    };
  });
};

export default getWeatherObject;
