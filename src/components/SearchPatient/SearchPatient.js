import React, { useState } from "react";
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
  return (
    <SearchPatientStyles>
      <Paper className="root" elevation={3}>
        <InputBase
          id="outlined-basic"
          variant="outlined"
          value={
            loading
              ? `Searching for patient : ${localPatientId}@NCG`
              : localPatientId
          }
          onChange={e => setPatientId(e.target.value)}
          size="small"
        />
        <InputBase className="text-field" disabled placeholder="@NCG" />
        <IconButton
          type="button"
          className="icon-button"
          aria-label="search"
          theme="primary"
          onClick={() => onSearch(localPatientId)}
        >
          {loading ? (
            <CircularProgress />
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
