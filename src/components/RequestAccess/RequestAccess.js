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
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">
              Patient Identifier
            </InputLabel>
          </Grid>
          <Grid item xs={3}>
            <SearchPatient />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">
              Purpose of request
            </InputLabel>
          </Grid>
          <Grid item xs={2}>
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
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Request from</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Request to</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Request type</InputLabel>
          </Grid>
          <Grid item xs={10}>
            <RequestType />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Consent Expiry</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker />
          </Grid>
          <Grid item xs={2}>
            <TimePicker />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Button variant="contained" color="primary">
            Request Consent
          </Button>
        </Grid>
      </form>
    </RequestAccessStyles>
  );
};

RequestAccess.defaultProps = {
  purposeTypes: [{ label: "General Consulting", value: "general_consulting" }]
};

export default RequestAccess;
