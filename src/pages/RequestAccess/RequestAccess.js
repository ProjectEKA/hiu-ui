import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@material-ui/core";
import RequestAccessStyles from "./RequestAccess.style";
import SearchPatient from "./../../components/SearchPatient";
import DateTimePicker from "./../../components/DateTimePicker/DateTimePicker";
import DatePicker from "./../../components/DateTimePicker/DatePicker";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import RequestType from "./../../components/RequestType/RequestType";
import SimpleMenu from "./../../components/SimpleMenu/SimpleMenu";
import getNextDay from "./../../utils/getNextDay";
import purposeTypes from "./../../constants/puposeTypes";
import requestTypes from "./../../constants/requestTypes";

const RequestAccess = ({
  onCreateConsent,
  patientId,
  loading,
  success,
  error
}) => {
  const [selectedPurposeValue, setSelectedPurposeValue] = React.useState(
    purposeTypes[0].value
  );
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
  const [selectedRequestTypes, setSelectedRequestTypes] = React.useState({
    PatientHistory: false,
    Medications: false,
    DiagnosisLab: false,
    RadiologyLab: false,
    Condition: false
  });

  const [selectedExpiryDate, setSelectedExpiryDate] = React.useState(
    getNextDay()
  );

  const handlePITypeChange = name => event => {
    setSelectedRequestTypes({
      ...selectedRequestTypes,
      [name]: event.target.checked
    });
  };
  const handleStarteDateChange = date => {
    var startDate = date;
    setSelectedStartDate(startDate);
  };
  const handleEndDateChange = date => {
    var startDate = selectedStartDate;
    var endDate = date;
    if (startDate.getTime() < endDate.getTime()) {
      setSelectedEndDate(endDate);
    }
  };
  const handleExpiryDateChange = date => {
    setSelectedExpiryDate(date);
  };

  const handlePurposeSelection = event => {
    setSelectedPurposeValue(event.target.value);
  };

  return (
    <RequestAccessStyles>
      <h2>Consent request form</h2>
      <form>
        <span className="label">All the fields are mandatory.</span>
        {error && (
          <span className="error">Error occured while creating consent.</span>
        )}
        {success && (
          <span className="success">Consent created successfully.</span>
        )}
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">
              Patient Identifier
            </InputLabel>
          </Grid>
          <Grid item xs={5}>
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
            <SimpleMenu
              menuItems={purposeTypes}
              handleChange={handlePurposeSelection}
              selectedValue={selectedPurposeValue}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">
              Health info from
            </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              minDate="01/01/1900"
              disableFuture={true}
              handleDateChange={handleStarteDateChange}
              selectedDate={selectedStartDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Health info to</InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              disableFuture={true}
              minDate={selectedStartDate}
              handleDateChange={handleEndDateChange}
              selectedDate={selectedEndDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label"> Request type </InputLabel>
          </Grid>
          <Grid item xs={10}>
            <RequestType
              requestTypes={requestTypes}
              handleChange={handlePITypeChange}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label">Consent Expiry</InputLabel>
          </Grid>
          <Grid item xs={3}>
            <DateTimePicker
              handleDateChange={handleExpiryDateChange}
              selectedDate={selectedExpiryDate}
              disablePast="true"
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Button
            className="create-consent-button"
            variant="contained"
            color="primary"
            onClick={() => {
              onCreateConsent({
                patientId,
                selectedPurposeValue,
                selectedStartDate,
                selectedEndDate,
                selectedExpiryDate,
                selectedRequestTypes
              });
            }}
          >
            Request Consent
          </Button>
        </Grid>
      </form>
      {loading && (
        <div className="loader-container">
          <CircularProgress
            id="loader"
            className="loader"
            variant="indeterminate"
            disableShrink
            thickness={4}
          />
        </div>
      )}
    </RequestAccessStyles>
  );
};

SearchPatient.defaultProps = {
  success: false,
  error: false
};

export default RequestAccess;
