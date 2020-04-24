import React, { useState, useEffect } from 'react';
import { IconButton, TextField, CircularProgress } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchPatientStyles from './SearchPatient.style';

const SearchPatient = ({
  onSearch,
  onSearchResetState,
  patientId,
  patientName,
  success,
  loading,
  error,
  serverError,
}) => {
  const [localPatientId, setPatientId] = useState(patientId);
  const [textInput, setTextInput] = useState('');
  useEffect(() => {
    if (loading) {
      const loadingText = 'Looking for '.concat(textInput);
      setTextInput(loadingText);
      setPatientId(textInput);
    } else {
      const successText = localPatientId.concat(': ', patientName);
      {
        success ? setTextInput(successText) : setTextInput(localPatientId);
      }
    }
  }, [loading]);

  const generateErrorText = () => {
    if (error || serverError) {
      return 'Id not found.';
    }
    return '';
  };

  const onChangeSearch = (e) => {
    setTextInput(e.target.value);
    onSearchResetState();
  };

  return (
    <SearchPatientStyles>
      <div className="search-bar">
        <TextField
          id="search-field"
          type="search"
          disabled={loading}
          error={error}
          helperText={generateErrorText()}
          value={textInput}
          InputProps={{
            endAdornment: <InputAdornment position="end">@ncg</InputAdornment>,
          }}
          onChange={onChangeSearch}
          onKeyPress={(e) => {
            if (event.key === 'Enter') {
              onSearch(textInput);
            }
          }}
        />
        <IconButton
          disabled={textInput.length == 0 || loading}
          type="button"
          className="icon-button"
          aria-label="search"
          theme="primary"
          onClick={() => onSearch(textInput)}
        >
          {loading ? (
            <CircularProgress
              id="loader"
              className="loader"
              variant="indeterminate"
              disableShrink
              size={24}
              thickness={4}
            />
          ) : (
            <SearchIcon
              id="search-button"
              className="search-button"
              variant="outlined"
              theme="primary"
            />
          )}
        </IconButton>
      </div>
    </SearchPatientStyles>
  );
};

SearchPatient.defaultProps = {
  patientId: '',
  loading: false,
  error: false,
  serverError: false,
};

export default SearchPatient;
