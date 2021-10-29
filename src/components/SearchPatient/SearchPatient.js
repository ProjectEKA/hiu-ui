import React, { useState, useEffect } from 'react';
import * as PropTypes from 'prop-types';
import {
  IconButton,
  TextField,
  CircularProgress,
  MenuItem,
  Select,
} from '@material-ui/core';
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
  cmConfigList,
}) => {
  const [localPatientId, setPatientId] = useState(patientId);
  const [textInput, setTextInput] = useState('');
  const [selectedCmSuffixValue, setSelectedCmSuffixValue] = useState(
    cmConfigList.length > 0 ? cmConfigList[0].userIdSuffix : ''
  );
  useEffect(() => {
    if (loading) {
      const loadingText = 'Looking for '.concat(textInput);
      setTextInput(loadingText);
      setPatientId(textInput);
    } else {
      const inputText = success
        ? localPatientId.concat(': ', patientName)
        : localPatientId;
      setTextInput(inputText);
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

  const handleCmListSelection = (event) => {
    setSelectedCmSuffixValue(event.target.value);
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
          onChange={onChangeSearch}
          onKeyPress={(e) => {
            if (event.key === 'Enter') {
              onSearch(textInput + selectedCmSuffixValue);
            }
          }}
        />
        <Select value={selectedCmSuffixValue} onChange={handleCmListSelection}>
          {cmConfigList.map((value) => (
            <MenuItem key={value.userIdSuffix} value={value.userIdSuffix}>
              {value.userIdSuffix}
            </MenuItem>
          ))}
        </Select>
        <IconButton
          disabled={textInput.length === 0 || loading}
          type="button"
          className="icon-button"
          aria-label="search"
          theme="primary"
          onClick={() => onSearch(textInput + selectedCmSuffixValue)}
        >
          {loading ? (
            <CircularProgress
              id="loader"
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

SearchPatient.propTypes = {
  patientId: PropTypes.string,
  patientName: PropTypes.string,
  success: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  serverError: PropTypes.bool,
  onSearch: PropTypes.func,
  onSearchResetState: PropTypes.func,
};

SearchPatient.defaultProps = {
  patientId: '',
  patientName: '',
  success: false,
  loading: false,
  error: false,
  serverError: false,
  onSearch: {},
  onSearchResetState: {},
};

export default SearchPatient;
