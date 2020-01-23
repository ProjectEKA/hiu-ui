import React, { useState, useEffect } from "react";
import SearchPatientStyles from "./SearchPatient.style";
import { IconButton, TextField, CircularProgress } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import Error from "@material-ui/icons/Error";

const SearchPatient = ({
  onSearch,
  patientId,
  loading,
  error,
  serverError
}) => {
  const [localPatientId, setPatientId] = useState(patientId);
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    if (loading) {
      setPatientId(textInput);
      setTextInput("Searching");
    } else {
      setTextInput(localPatientId);
    }
  }, [loading]);

  return (
    <SearchPatientStyles>
      <div className="search-bar">
        <TextField
          id="search-field"
          disabled={loading}
          error={error}
          helperText={error ? `Id doesnt exists` : ""}
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
        />
        <TextField
          className="fiduciary-text-field"
          disabled
          placeholder="@NCG"
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
        {serverError && <Error color="action" />}
      </div>
    </SearchPatientStyles>
  );
};

SearchPatient.defaultProps = {
  patientId: "",
  loading: false,
  error: false,
  serverError: false
};

export default SearchPatient;
