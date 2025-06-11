import React, { useState } from "react";
import "./App.css";




// using usestate hook//
const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_KEY;
   // using API key to fetch weather details//
  const style={
    
  }
  
  const fetchWeather = async () => {
    if (!city) return;
    setError(null);
    try {
      const response = await fetch(`${API_URL}${city}&aqi=yes`);
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  const styles={
display:'flex', justifyContent:'center', alignItems:'center',color:'yellow',font:'30px'
  };

  return (
    <>
    
    <h2 style={styles}>My Weather API app</h2>
    <div className="container">
      
      <h2 className="title">Weather App</h2>
      <input
        type="text"
        className="input"
        placeholder="Enter city..."
        value={city}
        onChange={(e) => setCity(e.target.value)} 
      />
      <button className="btn" onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h3 className="city-name">{weather.location.name}, {weather.location.country}</h3>
          <p className="temp">Temperature: {weather.current.temp_c}°C</p>
          <p className="humidity">Humidity: {weather.current.humidity}%</p>
          <p className="condition">Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="weather-icon" />
        </div>
      )}
    </div>
    </>
  );
};

export default WeatherApp;
