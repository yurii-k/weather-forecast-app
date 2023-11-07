import React, { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import { City } from '../shared/models.ts';
import { fetchCities } from '../services/api.service.ts';

import './../styles/CitySearch.scss';

export default function CitySearch({ city, onSelectCity }) {
  const [value, setValue] = useState<City | null>(city);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly City[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchCities(inputValue)
      .then((results: City[]) => {
        setOptions(results);
        setError(null);
      })
      .catch((error) => {
        setError('Error fetching cities. Please try again later.');
        console.error(error);
        setSnackbarOpen(true);
      });

    return () => {};
  }, [value, inputValue]);

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    setValue(city);
    setInputValue(city?.name || '');
  }, [city]);

  return (
    <div>
      {error && (
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          anchorOrigin={{ vertical, horizontal }}
          onClose={handleCloseSnackbar}
        >
          <Alert
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
            onClose={handleCloseSnackbar}
          >
            {error}
          </Alert>
        </Snackbar>
      )}

      <Autocomplete
        sx={{ width: 300 }}
        filterOptions={(x) => x}
        options={options}
        autoComplete
        includeInputInList
        filterSelectedOptions
        value={value}
        onChange={(event: any, newValue: City | null) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
          onSelectCity(newValue);
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => <TextField {...params} label="City" />}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        renderOption={(props, option) => {
          return (
            <li {...props} key={`${option.lat}-${option.lon}-${option.isHistoryItem}`}>
              {option.name}({option.country})
            </li>
          );
        }}
      />
    </div>
  );
}
