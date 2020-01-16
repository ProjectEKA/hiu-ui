import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import RequestAccessStyles from "./RequestAccess.style";
import SearchPatient from "../SearchPatient";
import DatePicker from "./../DateTimePicker/DatePicker";
import TimePicker from "./../DateTimePicker/TimePicker";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import RequestType from "./../RequestType/RequestType";

const RequestAccess = ({ purposeTypes }) => {
  const [purpose, setPurpose] = useState("");

  return (
    <RequestAccessStyles>
      <h2>Consent request form</h2>
      <form>
        <span className="text-field-container">
          <InputLabel className="text-field-label">
            Patient Identifier
          </InputLabel>
          <SearchPatient />
        </span>
        <span className="text-field-container">
          <InputLabel className="text-field-label">
            Purpose of request
          </InputLabel>
          <Select
            value={purpose}
            onChange={e => {
              setPurpose(e.target.value);
              console.log(e);
            }}
          >
            {purposeTypes.map(type => (
              <MenuItem key={type.value} value={type.value}>
                {type.label}
              </MenuItem>
            ))}
          </Select>
        </span>
        <span className="text-field-container">
          <InputLabel className="text-field-label">Request from</InputLabel>
          <DatePicker />
        </span>
        <span className="text-field-container">
          <InputLabel className="text-field-label">Request to</InputLabel>
          <DatePicker />
        </span>
        <span className="text-field-container">
          <InputLabel className="text-field-label">Request type</InputLabel>
          <RequestType />
        </span>
        <span className="text-field-container">
          <Grid container spacing={2}>
            <Grid item basis={20}>
              <InputLabel className="text-field-label">
                Consent Expiry
              </InputLabel>
            </Grid>
            <Grid item>
              <DatePicker />
            </Grid>
            <Grid item>
              <TimePicker />
            </Grid>
          </Grid>
        </span>
        <Button variant="contained" color="primary">
          Request Consent
        </Button>
      </form>
    </RequestAccessStyles>
  );
};

RequestAccess.defaultProps = {
  purposeTypes: [{ label: "General Consulting", value: "general_consulting" }]
};

export default RequestAccess;
