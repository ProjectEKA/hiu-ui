import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import { Button, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import RequestAccessStyles from './RequestAccess.style';
import SearchPatient from '../../components/SearchPatient';
import DateTimePicker from '../../components/DateTimePicker/DateTimePicker';
import DatePicker from '../../components/DateTimePicker/DatePicker';
import RequestType from '../../components/RequestType/RequestType';
import SimpleMenu from '../../components/SimpleMenu/SimpleMenu';
import getNextDay from '../../utils/getNextDay';

const RequestAccess = ({
  onCreateConsent,
  patientId,
  loading,
  error,
  purposesOfUse,
  hiTypes,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());
  const usagePurposes = purposesOfUse.map((p) => ({
    label: p.display,
    value: p.code,
  }));
  const [selectedPurposeValue, setSelectedPurposeValue] = useState(
    usagePurposes.length > 0 ? usagePurposes[0].value : ''
  );
  const requestHiTypes = hiTypes.map((p) => ({
    label: p.display,
    value: p.code,
  }));
  const hiTypesInitialStates = Object.assign(
    ...requestHiTypes.map((hiType) => {
      return { [hiType.value]: false };
    })
  );
  const [selectedRequestTypes, setSelectedRequestTypes] = useState(
    hiTypesInitialStates
  );

  const [emptyPatientIDError, setEmptyPatientIDError] = useState(false);
  const [selectedExpiryDate, setSelectedExpiryDate] = useState(getNextDay());

  const isButtonEnabled = Object.values(selectedRequestTypes).some((x) => x);

  const handleHITypeChange = (name) => (event) => {
    setSelectedRequestTypes({
      ...selectedRequestTypes,
      [name]: event.target.checked,
    });
  };
  const handleStarteDateChange = (date) => {
    const startDate = date;
    setSelectedStartDate(startDate);
  };
  const handleEndDateChange = (date) => {
    const startDate = selectedStartDate;
    const endDate = date;
    if (startDate.getTime() < endDate.getTime()) {
      setSelectedEndDate(endDate);
    }
  };
  const handleExpiryDateChange = (date) => {
    setSelectedExpiryDate(date);
  };

  const handlePurposeSelection = (event) => {
    setSelectedPurposeValue(event.target.value);
  };

  return (
    <RequestAccessStyles>
      <h2>Consent request form</h2>
      <div className="form-container">
        <form>
          <span className="label">All the fields are mandatory.</span>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <InputLabel className="text-field-label">
                Patient Identifier
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <SearchPatient />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <InputLabel className="text-field-label">
                Purpose of request
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <SimpleMenu
                menuItems={usagePurposes}
                handleChange={handlePurposeSelection}
                selectedValue={selectedPurposeValue}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <InputLabel className="text-field-label">
                Health info from
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <DatePicker
                disableFuture
                handleDateChange={handleStarteDateChange}
                selectedDate={selectedStartDate}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <InputLabel className="text-field-label">Health info to</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <DatePicker
                disableFuture
                minDate={selectedStartDate}
                handleDateChange={handleEndDateChange}
                selectedDate={selectedEndDate}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4} md={3} className="request-type-label">
              <InputLabel className="text-field-label">Health info type</InputLabel>
            </Grid>
            <Grid item xs={12} sm={8}>
              <RequestType
                requestTypes={requestHiTypes}
                handleChange={handleHITypeChange}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4} md={3}>
              <InputLabel className="text-field-label">Consent Expiry</InputLabel>
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <DateTimePicker
                handleDateChange={handleExpiryDateChange}
                selectedDate={selectedExpiryDate}
                disablePast
              />
            </Grid>
          </Grid>
          {error && (
            <span className="error">Error occured while creating consent.</span>
          )}
          {emptyPatientIDError && (
            <span className="error">Please enter a patient identifier</span>
          )}
          <Grid container spacing={2} alignItems="center" justify="center">
            <Button
              disabled={!isButtonEnabled}
              className="create-consent-button"
              variant="contained"
              color="primary"
              onClick={() => {
                if (!patientId) {
                  setEmptyPatientIDError(true);
                  return;
                }
                onCreateConsent({
                  patientId,
                  selectedPurposeValue,
                  selectedStartDate,
                  selectedEndDate,
                  selectedExpiryDate,
                  selectedRequestTypes,
                });
              }}
            >
              Request Consent
            </Button>
          </Grid>
        </form>
      </div>
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

RequestAccess.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.bool,
  onCreateConsent: PropTypes.func.isRequired,
  patientId: PropTypes.string,
  purposesOfUse: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
  hiTypes: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      display: PropTypes.string.isRequired,
    })
  ),
};

RequestAccess.defaultProps = {
  loading: false,
  error: false,
  patientId: '',
  purposesOfUse: [],
  hiTypes: [],
};

export default RequestAccess;
