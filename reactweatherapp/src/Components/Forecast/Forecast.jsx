import './Forecast.css';

function Forecast({ data }) {
  const weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const today = new Date().getDay();
  const forecast = [];

  data.list.forEach((item) => {
    const date = new Date(item.dt_txt);
    if (date.getDay() !== today && date.getHours() === 12) {
      forecast.push(
        <div key={item.dt_txt}>
          <h1 className="day">{weekDays[date.getDay()]}</h1>
          <h1 className="temp">
            {Math.round(item.main.temp)}
            °C
          </h1>
          <img
            src={`./Assets/${item.weather[0].icon}.png`}
            alt="weather-icon"
            className="weather-icon"
          />
        </div>
      );
    }
  });
  return <div className="forecast-container">{forecast}</div>;
}

export default Forecast;
