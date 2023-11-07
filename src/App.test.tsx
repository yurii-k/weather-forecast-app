import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import App from './App';
import { fetchCities, fetchWeather } from './services/api.service';
import { WEATHER_TYPES } from './shared/const';

jest.mock('./services/api.service', () => ({
  fetchCities: jest.fn(),
  fetchWeather: jest.fn()
}));

const mockCities = [
  {
    name: 'New York',
    country: 'US',
    lat: 40.7128,
    lon: -74.006,
    isHistoryItem: false,
    isDeleted: false
  }
];

const mockWeather = {
  weatherType: WEATHER_TYPES.Clouds,
  description: 'overcast clouds',
  temp: 20.8,
  tempMin: 19.37,
  tempMax: 21.99,
  humidity: 58,
  windSpeed: 2.5
};

describe('App Component', () => {
  let input;

  beforeEach(() => {
    render(<App />);
    (fetchCities as jest.Mock).mockResolvedValue(mockCities);
    (fetchWeather as jest.Mock).mockResolvedValue(mockWeather);

    input = screen.getByLabelText('City');
  });

  it('fetches and displays cities', async () => {
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'New York' } });

    await waitFor(() => {
      expect(screen.getByText('New York(US)')).toBeInTheDocument();
    });
  });

  it('displays weather information for a selected city', async () => {
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'New York' } });

    await waitFor(() => {
      expect(screen.getByText('New York(US)')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('New York(US)'));

    await waitFor(() => {
      expect(screen.getByText('20.8°')).toBeInTheDocument();
    });
  });

  it('displays selected city in the search history', async () => {
    fireEvent.click(input);
    fireEvent.change(input, { target: { value: 'New York' } });

    await waitFor(() => {
      expect(screen.getByText('New York(US)')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('New York(US)'));

    await waitFor(() => {
      const parentElement = screen.getByTestId('history-container');
      const childElement = within(parentElement).getByText('New York');

      expect(childElement).toBeInTheDocument();
    });
  });
});
