import React from "react";
import SearchPatientStyles from "./SearchPatient.style";
import { Paper, IconButton, InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

const SearchPatient = ({ onSearch, patientId }) => {
  return (
    <SearchPatientStyles>
      <Paper elevation={1}>
        <InputBase
          className="text-field"
          inputProps={{ "aria-label": "search google maps" }}
          value={patientId}
        />
        <InputBase className="text-field" disabled placeholder="@NCG" />
        <IconButton
          type="button"
          className="icon-button"
          aria-label="search"
          theme="primary"
          onClick={onSearch}
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
