import { useState } from "react";
import "./App.css";
import axios from "axios";
import Search from "./Components/Search/Search";
import CurrentWeather from "./Components/CurrentWeather/CurrentWeather";
import Forecast from "./Components/Forecast/Forecast";
import { weatherApiLink, weatherApiKey } from "./Api";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentForecast, setCurrentForecast] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const req1 = axios.get(
      `${weatherApiLink}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`,
    );
    const req2 = axios.get(
      `${weatherApiLink}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${weatherApiKey}`,
    );

    axios
      .all([req1, req2])
      .then(
        axios.spread((...responses) => {
          const currentWeatherResponse = responses[0].data;
          const forecastResponse = responses[1].data;
          setCurrentWeather({
            city: searchData.label,
            ...currentWeatherResponse,
          });
          setCurrentForecast(forecastResponse);
        }),
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
