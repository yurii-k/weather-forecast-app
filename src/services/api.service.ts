import axios from 'axios';
import { API_KEY, BASE_API_URL } from '../shared/const.ts';
import { Weather, City } from '../shared/models.ts';

export const fetchCities = async (query: string): Promise<City[]> => {
  try {
    const response = await axios.get(`${BASE_API_URL}geo/1.0/direct`, {
      params: {
        q: query,
        limit: 5,
        appid: API_KEY
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return response.data.map(
      (city) =>
        ({
          ...city,
          isHistoryItem: false,
          isDeleted: false
        }) as City
    );
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

export const fetchWeather = async (city: City): Promise<Weather> => {
  try {
    const { lat, lon } = city;
    const response = await axios.get(`${BASE_API_URL}data/2.5/weather`, {
      params: {
        lat,
        lon,
        appid: API_KEY,
        units: 'metric'
      }
    });

    if (response.status !== 200) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return new Weather(response.data);
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};
