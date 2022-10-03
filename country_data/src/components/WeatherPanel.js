import PropTypes from "prop-types";
import React from "react";
import getWeatherObject from "../services/weather";

const WeatherPanel = ({ lat, long }) => {
  const [weather, setWeather] = React.useState(null);

  const currentWeatherStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "10px",
    margin: "10px auto",
    width: "200px",
    height: "200px",
    background: "rgba(220, 195, 195, 0.75)",
    font: "1.2rem Arial",
  };
  const headerStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "black",
    fontFamily: "comic sans ms",
  };

  React.useEffect(() => {
    getWeatherObject(lat, long).then((response) => {
      setWeather(response);
    });
  }, [lat, long]);

  if (weather === null) {
    return <div>Loading weather...</div>;
  }

  return (
    <div>
      <hr />
      <h2 style={headerStyle}>Weather</h2>

      <p>
        <b>Temperature:</b> {weather.temperature} Celsius
      </p>
      <p>
        <b>Rain:</b> {weather.rainfall} mm
      </p>
      <p>
        <b>Wind:</b> {weather.wind} mph
      </p>
      <div className="currentWeatherSection" style={currentWeatherStyle}>
        <h4>Current Weather</h4>
        <img
          src={`http://openweathermap.org/img/wn/${weather.current.icon}@2x.png`}
          alt="weather icon"
        />
        <div className="weatherStats">
          <p>{weather.current.description.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
};

WeatherPanel.propTypes = {
  lat: PropTypes.number.isRequired,
  long: PropTypes.number.isRequired,
};

export default WeatherPanel;
