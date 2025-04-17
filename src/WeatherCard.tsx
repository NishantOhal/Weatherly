import React from 'react';
import { Wind, Droplets, Sun, Thermometer } from 'lucide-react';

interface WeatherCardProps {
  weather: {
    name: string;
    main: {
      temp: number;
      feels_like: number;
      humidity: number;
    };
    wind: {
      speed: number;
    };
    weather: Array<{
      description: string;
      icon: string;
    }>;
  };
  unit: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ weather, unit }) => {
  const formatTemp = (temp: number) => Math.round(temp);
  const formatDate = () => {
    return new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="weather-card">
      <div className="weather-header">
        <div>
          <div className="weather-location">{weather.name}</div>
          <div className="weather-date">{formatDate()}</div>
        </div>
      </div>

      <div className="weather-main">
        <div>
          <div className="weather-temp">
            {formatTemp(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
          </div>
          <div className="weather-feels">
            Feels like {formatTemp(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
          </div>
        </div>
        <img
          className="weather-icon"
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather icon"
        />
      </div>

      <div className="weather-description">
        {weather.weather[0].description}
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <Wind className="weather-detail-icon" size={20} />
          <div>
            <div className="weather-detail-label">Wind Speed</div>
            <div className="weather-detail-value">
              {weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}
            </div>
          </div>
        </div>

        <div className="weather-detail">
          <Droplets className="weather-detail-icon" size={20} />
          <div>
            <div className="weather-detail-label">Humidity</div>
            <div className="weather-detail-value">{weather.main.humidity}%</div>
          </div>
        </div>

        <div className="weather-detail">
          <Sun className="weather-detail-icon" size={20} />
          <div>
            <div className="weather-detail-label">Temperature</div>
            <div className="weather-detail-value">
              {formatTemp(weather.main.temp)}°{unit === 'metric' ? 'C' : 'F'}
            </div>
          </div>
        </div>

        <div className="weather-detail">
          <Thermometer className="weather-detail-icon" size={20} />
          <div>
            <div className="weather-detail-label">Feels Like</div>
            <div className="weather-detail-value">
              {formatTemp(weather.main.feels_like)}°{unit === 'metric' ? 'C' : 'F'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;