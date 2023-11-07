import { useCallback, useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Divider, Snackbar } from '@mui/material';
import Card from '@mui/material/Card';

import './App.scss';
import CardDetails from './components/CardDetails.tsx';
import History from './components/History.tsx';
import CitySearch from './components/CitySearch.tsx';
import { fetchWeather } from './services/api.service.ts';
import { City, Weather } from './shared/models';

function App() {
  const [city, setCity] = useState(null);
  const [history, setHistory] = useState([]);
  const [weather, setWeather] = useState(null);
  const [open, setOpen] = useState(false);
  const [lastDeletedRecordIndex, setLastDeletedRecordIndex] = useState(null);

  const vertical = 'bottom';
  const horizontal = 'center';

  const handleSelectCity = useCallback(
    (city: City) => {
      if (city) {
        setCity(city);

        const cityIndex = history.findIndex((historyItem: City) => {
          return historyItem.lon === city.lon && historyItem.lat === city.lat;
        });

        if (cityIndex < 0) {
          setHistory([...history, city]);
        } else if (cityIndex >= 0) {
          let newHistory = [...history];
          newHistory[cityIndex].isDeleted = false;
          setHistory(newHistory);
        }
      }
    },
    [history, city]
  );

  const handleDeleteHistoryRecord = useCallback(
    (index) => {
      let newHistory = [...history];
      newHistory[index].isDeleted = true;

      setHistory(newHistory);
      setOpen(true);
      setLastDeletedRecordIndex(index);
    },
    [history]
  );

  useEffect(() => {
    if (city) {
      fetchWeather(city)
        .then((result: Weather) => {
          setWeather(result);
        })
        .catch((error) => console.error(error));
    }
  }, [city]);

  function undoDeleteHistoryRecord(index: number) {
    let newHistory = [...history];
    newHistory[index].isDeleted = false;

    setHistory(newHistory);
    setOpen(false);
    setLastDeletedRecordIndex(null);
  }

  function handleCloseSnackbar() {
    setOpen(false);
    setLastDeletedRecordIndex(null);
  }

  return (
    <div className="App">
      <Card className="Card">
        <h3>weather forecast</h3>
        <CitySearch city={city} onSelectCity={handleSelectCity} />
        {weather && <CardDetails weather={weather} />}
        <Divider />
        <History
          history={history}
          onSelectCity={handleSelectCity}
          onDeleteHistoryRecord={handleDeleteHistoryRecord}
        />
      </Card>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        anchorOrigin={{ vertical, horizontal }}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
          onClose={handleCloseSnackbar}
          action={
            <Button
              color="inherit"
              size="small"
              onClick={() => undoDeleteHistoryRecord(lastDeletedRecordIndex)}
            >
              UNDO
            </Button>
          }
        >
          <AlertTitle>Success</AlertTitle>
          {history[lastDeletedRecordIndex]?.name} has been deleted successfully from the history
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
