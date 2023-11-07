import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';

import { WEATHER_TYPES } from '../shared/const.ts';
import './../styles/WeatherIcon.scss';

function WeatherIcon({ weatherType }) {
  let icon;

  switch (weatherType) {
    case WEATHER_TYPES.Clear:
      icon = <WbSunnyIcon className="description-icon clear" />;
      break;

    case WEATHER_TYPES.Clouds:
      icon = <WbCloudyIcon className="description-icon clouds" />;
      break;

    case WEATHER_TYPES.Rain:
      icon = <ThunderstormIcon className="description-icon rain" />;
      break;

    case WEATHER_TYPES.Snow:
      icon = <AcUnitIcon className="description-icon snow" />;
      break;

    default:
      icon = <WbSunnyIcon className="description-icon clear" />;
      break;
  }

  return <>{icon}</>;
}

export default WeatherIcon;
