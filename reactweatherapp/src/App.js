import React, { useState } from 'react';
import './App.css';
import Search from './Components/search/search.js';
import CurrentWeather from './Components/current-weather/current-weather';

function App() {
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(' ');
  };

  return (
    <div className="main">
      <Search onSearchChange={handleOnSearchChange} />
      <CurrentWeather />
    </div>
  );
}

export default App;
