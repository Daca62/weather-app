import { useState } from "react";
import Search from "../search/Search";
import { useEffect } from "react";

//https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

export default function Weather() {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;

  async function fetchWeatherData(param) {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();

      if (data) {
        setWeatherData(data);
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    }
  }

  function handleSearch() {
    fetchWeatherData(search);
  }

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  useEffect(() => {
    fetchWeatherData("Ljubinje");
  }, []);

  console.log(weatherData);

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {isLoading ? (
        <div className="loading">Loading data, please wait...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temperature">
            {weatherData?.main?.temp}
            {"°"}
          </div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p className="column-label">Wind Speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}</p>
                <p className="column-label">Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
