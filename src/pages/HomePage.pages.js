import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  WiBarometer,
  WiStrongWind,
  WiSunrise,
  WiSunset,
  WiThermometer,
} from "weather-icons-react";
import "../assets/style/HomePage.css";
import Image from "../components/Image.component";

const api = {
  key: "3889f2f9cbdff2f72e59e36233f9e681",
  base: "https://api.openweathermap.org/data/2.5/",
};

const HomePage = () => {
  const [weather, setWeather] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const savedWeather = JSON.parse(localStorage.getItem("weather"));
    if (savedWeather) {
      setWeather(savedWeather);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("weather", JSON.stringify(weather));
  }, [weather]);

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((response) => {
          setWeather({
            id: response.data.id,
            name: response.data.name,
            temp: response.data.main.temp,
            pressure: response.data.main.pressure,
            country: response.data.sys.country,
            speed: response.data.wind.speed,
            main: response.data.weather.main,
            temp_min: response.data.main.temp_min,
            temp_max: response.data.main.temp_max,
            sunrise: response.data.sys.sunrise,
            sunset: response.data.sys.sunset,
          });
          localStorage.setItem("weatherData", JSON.stringify(weather));
          // console.log(response);
          setQuery("");
        });
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const timeOfSunsetAndSunrise = (timeOfSunsetAndSunrise) => {
    let hours = timeOfSunsetAndSunrise.getHours();
    let minutes = timeOfSunsetAndSunrise.getMinutes();
    return `${hours}:${minutes}`;
  };

  return (
    <div className="app">
      <h1 className="h1-header">WEATHER APP</h1>

      <Image
        style={{ width: "150px", height: "150px" }}
        url={
          "https://cdn.pixabay.com/photo/2016/05/20/20/20/weather-1405870_960_720.png"
        }
      />
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleChange}
          value={query}
          onKeyDown={searchLocation}
          autoComplete="on"
        />
      </div>
      <div className="date">{dateBuilder(new Date())}</div>
      {weather && (
        <div className="city-description">
          <div className="p-city" key={weather.id}>
            <p className="p-city">
              {weather.name}, {weather.country}
            </p>
            <p className="p-temperature">{Math.round(weather.temp)}°C</p>

            <div className="block">
              <div className="wind">
                {<WiStrongWind size={30} color="#8c8991" />}
                <p className="mini-text"> Wind</p>
                <p>{Math.round(weather.speed)} km/h</p>
              </div>

              <div className="pressure">
                {<WiBarometer size={30} color="#195380" />}
                <p className="mini-text">Pressure</p>
                <p>{weather.pressure} hPa</p>
              </div>
            </div>
            <div className="high-low">
              {<WiThermometer size={30} color="#705f3e" />}
              <p className="mini-text">High/Low</p>
              <p>
                {Math.round(weather.temp_max)}°C/{Math.round(weather.temp_min)}
                °C
              </p>
            </div>
            <div className="block-sunrise">
              <div className="wind">
                {<WiSunrise size={30} color="#f5d442" />}
                <p className="mini-text">Sunrise</p>
                <p>
                  {timeOfSunsetAndSunrise(new Date(weather.sunrise * 1000))}
                </p>
              </div>
              <div className="pressure">
                {<WiSunset size={30} color="#f58742" />}
                <p className="mini-text">Sunset</p>
                <p>{timeOfSunsetAndSunrise(new Date(weather.sunset * 1000))}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
