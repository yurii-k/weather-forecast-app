import { memo } from 'react';
import { Tooltip } from '@mui/material';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import AirIcon from '@mui/icons-material/Air';
import OpacityIcon from '@mui/icons-material/Opacity';

import WeatherIcon from './WeatherIcon.tsx';
import './../styles/CardDetails.scss';
import { Weather } from '../shared/models';

const CardDetails = memo(({ weather }: { weather: Weather }) => {
  return (
    <>
      <div className="main-info-wrapper">
        <div className="current-temperature">{weather?.temp}°</div>
        <div className="weather-description">
          <WeatherIcon weatherType={weather?.weatherType} />
          <div>{weather?.description}</div>
        </div>
      </div>
      <p className="temperature-range">
        <ThermostatIcon className="icon" />
        <Tooltip title="Max temperature" placement="right">
          <span className="max-temperature">{weather?.tempMax}°</span>
        </Tooltip>
        /
        <Tooltip title="Min temperature" placement="right">
          <span className="min-temperature">{weather?.tempMin}°</span>
        </Tooltip>
      </p>
      <p className="wind-speed">
        <Tooltip title="Wind speed" placement="right">
          <div>
            <AirIcon className="icon" />
            {weather?.windSpeed} km/h
          </div>
        </Tooltip>
      </p>
      <p className="humidity">
        <Tooltip title="Humidity" placement="right">
          <div>
            <OpacityIcon className="icon" />
            {weather?.humidity}%
          </div>
        </Tooltip>
      </p>
    </>
  );
});

export default CardDetails;
