import React, { useState } from "react";
import SearchPatientStyles from "./SearchPatient.style";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchPatient = ({ onSearch, patientId }) => {
  const [localPatientId, setPatientId] = useState(patientId);
  return (
    <SearchPatientStyles>
      <Paper elevation={1}>
        <InputBase
          className="text-field"
          inputProps={{ "aria-label": "search google maps" }}
          value={localPatientId}
          onChange={e => setPatientId(e.target.value)}
        />
        <InputBase className="text-field" disabled placeholder="@NCG" />
        <IconButton
          type="button"
          className="icon-button"
          aria-label="search"
          theme="primary"
          onClick={() => onSearch(localPatientId)}
        >
          <SearchIcon
            className="icon-button"
            variant="outlined"
            theme="primary"
          />
        </IconButton>
      </Paper>
    </SearchPatientStyles>
  );
};

export default SearchPatient;
