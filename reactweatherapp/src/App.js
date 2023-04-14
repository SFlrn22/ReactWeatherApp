import React, { useState } from 'react';
import './App.css';
import Search from './Components/Search/Search.js';
import CurrentWeather from './Components/Current-weather/Current-weather';
import Forecast from './Components/Forecast/Forecast';
import { openWeatherApi_Link, openWeatherApi_KEY } from './api.js';
import axios from 'axios';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    const req1 = axios.get(
      `${openWeatherApi_Link}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApi_KEY}`
    );
    const req2 = axios.get(
      `${openWeatherApi_Link}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApi_KEY}`
    );

    axios
      .all([req1, req2])
      .then(
        axios.spread((...responses) => {
          const currentWeatherResponse = responses[0]['data'];
          const forecastResponse = responses[1]['data'];
          setCurrentWeather({
            city: searchData.label,
            ...currentWeatherResponse,
          });
          setCurrentForecast(forecastResponse);
        })
      )
      .catch((err) => console.log(err));
  };

  return (
    <div className="main">
      <div className="comps-container">
        <Search onSearchChange={handleOnSearchChange} />
        <div className="weather-container">
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {currentForecast && <Forecast data={currentForecast} />}
        </div>
      </div>
    </div>
  );
}

export default App;
