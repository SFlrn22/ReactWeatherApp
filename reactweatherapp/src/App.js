import React, { useState } from 'react';
import './App.css';
import Search from './Components/search/search.js';
import CurrentWeather from './Components/current-weather/current-weather';
import { openWeatherApi_Link, openWeatherApi_KEY } from './api.js';
import axios from 'axios';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');

    axios
      .get(
        `${openWeatherApi_Link}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${openWeatherApi_KEY}`
      )
      .then(async (response) => {
        const currentWeatherResponse = await response['data'];
        setCurrentWeather({
          city: searchData.label,
          ...currentWeatherResponse,
        });
      })
      .catch((err) => console.log(err));
  };

  console.log(currentWeather);

  return (
    <div className="main">
      <div className="comps-container">
        <Search onSearchChange={handleOnSearchChange} />
        {currentWeather && <CurrentWeather data={currentWeather} />}
      </div>
    </div>
  );
}

export default App;
