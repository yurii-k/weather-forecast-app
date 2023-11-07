import { memo } from 'react';
import { IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { City } from '../shared/models';
import './../styles/History.scss';

const History = memo(({ history, onSelectCity, onDeleteHistoryRecord }) => {
  const hasVisibleHistoryRecords = history?.some((city: City) => !city.isDeleted);

  if (hasVisibleHistoryRecords) {
    return (
      <div id="history-container" data-testid="history-container">
        <p>Search History:</p>
        {history.map((item, index) => (
          <div
            key={index}
            hidden={item.isDeleted}
            className={item.isDeleted ? '' : 'history-record'}
          >
            <div className="city-name" onClick={() => onSelectCity(item)}>
              {item?.name}
            </div>
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => onDeleteHistoryRecord(index)}
            >
              <ClearIcon fontSize="small" />
            </IconButton>
          </div>
        ))}
      </div>
    );
  } else {
    return null;
  }
});

export default History;
