import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { City } from '../shared/models.ts';
import { fetchCities } from '../services/api.service.ts';

import './../styles/CitySearch.scss';

export default function CitySearch({ city, onSelectCity }) {
  const [value, setValue] = useState<City | null>(city);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<readonly City[]>([]);

  useEffect(() => {
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetchCities(inputValue)
      .then((results: City[]) => {
        setOptions(results);
      })
      .catch((error) => console.error(error));

    return () => {};
  }, [value, inputValue]);

  useEffect(() => {
    setValue(city);
    setInputValue(city?.name || '');
  }, [city]);

  return (
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
  );
}
