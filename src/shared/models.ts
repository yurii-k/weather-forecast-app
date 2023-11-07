import { WEATHER_TYPES } from './const.ts';

export interface City {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
  isHistoryItem: boolean;
  isDeleted: boolean;
}

export interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export class Weather {
  weatherType: WEATHER_TYPES;
  description: string;
  temp: number;
  tempMin: number;
  tempMax: number;
  humidity: number;
  windSpeed: number;

  constructor(data: WeatherData) {
    this.weatherType = WEATHER_TYPES[data.weather[0].main];
    this.description = data.weather[0].description;
    this.temp = data.main.temp;
    this.tempMin = data.main.temp_min;
    this.tempMax = data.main.temp_max;
    this.humidity = data.main.humidity;
    this.windSpeed = data.wind.speed;
  }
}
