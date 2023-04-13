import './current-weather.css';

const CurrentWeather = ({ data }) => {
  return (
    <div className="current-weather">
      <div className="main-ws">
        <div className="icon">
          <img
            src={`./Assets/${data.weather[0].icon}.png`}
            alt="weather-icon"
            className="weather-icon"
          />
        </div>
        <div className="main-stats">
          <div className="location">
            <span>{data.city}</span>
          </div>
          <div className="description">
            <span>{data.weather[0].description}</span>
          </div>
          <div className="temperature">
            <p>{Math.round(data.main.temp)}°C</p>
            <span>Feels like: {Math.round(data.main.feels_like)}°C</span>
          </div>
        </div>
      </div>
      <div className="secondary-ws">
        <div className="min-temp">
          <span className="title">Min</span>
          <span>{Math.round(data.main.temp_min)}°C</span>
        </div>
        <div className="max-temp">
          <span className="title">Max</span>
          <span>{Math.round(data.main.temp_max)}°C</span>
        </div>
        <div className="humidity">
          <span className="title">Humidity</span>
          <span>{data.main.humidity}%</span>
        </div>
        <div className="sunrise">
          <span className="title">Sunrise</span>
          <span>
            {new Date(data.sys.sunrise * 1000).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
        </div>
        <div className="sunset">
          <span className="title">Sunset</span>
          <span>
            {new Date(data.sys.sunset * 1000).toLocaleString('en-US', {
              hour: 'numeric',
              minute: 'numeric',
              hour12: true,
            })}
          </span>
        </div>
        <div className="wind-speed">
          <span className="title">Wind speed</span>
          <span>{data.wind.speed} m/s</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
