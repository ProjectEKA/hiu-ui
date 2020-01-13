import React, { useState, useEffect } from "react";
import SearchPatientStyles from "./SearchPatient.style";
import {
  IconButton,
  InputBase,
  Paper,
  CircularProgress
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchPatient = ({ onSearch, patientId, loading }) => {
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
      <Paper className="root" elevation={3}>
        <InputBase
          id="outlined-basic"
          disabled={loading}
          variant="outlined"
          value={textInput}
          onChange={e => setTextInput(e.target.value)}
          size="small"
        />
        <InputBase className="text-field" disabled placeholder="@NCG" />
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
              className="loader"
              variant="indeterminate"
              disableShrink
              size={24}
              thickness={4}
            />
          ) : (
            <SearchIcon
              className="icon-button"
              variant="outlined"
              theme="primary"
            />
          )}
        </IconButton>
      </Paper>
    </SearchPatientStyles>
  );
};

SearchPatient.defaultProps = {
  patientId: ""
};

export default SearchPatient;
