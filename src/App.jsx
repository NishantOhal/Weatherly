import  { useState, useEffect, useCallback } from 'react';
import WeatherCard from './WeatherCard';
import './App.css';

const API_KEY = '315dfe078b205c56d54f448aeb1e126b';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const fetchWeatherByCity = async () => {
    if (!city) return;

    try {
      setError('');
      setWeather(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      const data = await response.json();

      if (data.cod !== 200) {
        setError(data.message);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError('Something went wrong. Try again.');
    }
  };

  const fetchWeatherByLocation = useCallback(async (lat, lon) => {
    try {
      setError('');
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        return;
      }
      setWeather(data);
    } catch (err) {
      setError('Unable to fetch weather for your location.');
    }
  }, [unit]);

  const toggleUnit = () => {
    setUnit(unit === 'metric' ? 'imperial' : 'metric');
  };

  const toggleDarkMode = () => {
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);
    
    if (newDarkModeState) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (prefersDarkMode) {
      setIsDarkMode(true);
      document.body.classList.add('dark-mode');
    }
    
    return () => {
      document.body.classList.remove('dark-mode');
    };
  }, []);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (err) => {
          setError('Geolocation not allowed. Try searching by city.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, [fetchWeatherByLocation]);

  return (
    <div className="app">
      <h1>🌦️ Weatherly</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeatherByCity()}
        />
        <button onClick={fetchWeatherByCity}>Search</button>
      </div>
      <div className="options">
        <button onClick={toggleUnit}>
          {unit === 'metric' ? '°C' : '°F'}
        </button>
        <button onClick={toggleDarkMode}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherCard weather={weather} unit={unit} />}
    </div>
  );
}

export default App;
