import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import RequestAccessStyles from "./RequestAccess.style";
import SearchPatient from "../SearchPatient";
import DateTimePicker from "./../DateTimePicker/DateTimePicker";
import DatePicker from "./../DateTimePicker/DatePicker";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import RequestType from "./../RequestType/RequestType";
import SimpleMenu from "./../SimpleMenu/SimpleMenu";

const RequestAccess = ({ onCreateConsent, patientId, success, error }) => {
  const purposeTypes = [
    {
      label: "Referral services",
      value: "ReferralService"
    },
    {
      label: "Episode of Care",
      value: "EpisodeOfCare"
    },
    {
      label: "Encounter",
      value: "Encounter"
    },
    {
      label: "Remote Consulting",
      value: "RemoteConsulting"
    }
  ];

  const requestTypes = [
    "Condition",
    "Observation",
    "DiagnosticReport",
    "MedicationRequest"
  ];
  const [selectedPurposeValue, setSelectedPurposeValue] = React.useState(
    purposeTypes[0].value
  );
  const [selectedStartDate, setSelectedStartDate] = React.useState();
  const [selectedEndDate, setSelectedEndDate] = React.useState();
  const [selectedRequestTypes, setselectedRequestTypes] = React.useState({
    PatientHistory: false,
    Medications: false,
    DiagnosisLab: false,
    RadiologyLab: false,
    Condition: false
  });
  const [selectedExpiryDate, setSelectedExpiryDate] = React.useState();

  const handlePITypeChange = name => event => {
    setselectedRequestTypes({
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
          <span className="success">Consent created successfylly.</span>
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
            <InputLabel className="text-field-label"> Request from </InputLabel>
          </Grid>
          <Grid item xs={2}>
            <DatePicker
              disableFuture={true}
              handleDateChange={handleStarteDateChange}
              selectedDate={selectedStartDate}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={2}>
            <InputLabel className="text-field-label"> Request to </InputLabel>
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
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} alignItems="center">
          <Button
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
    </RequestAccessStyles>
  );
};

SearchPatient.defaultProps = {
  success: false,
  error: false
};

export default RequestAccess;
