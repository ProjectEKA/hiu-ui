import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, AlertTitle } from "@material-ui/lab";
import Snackbar from "@material-ui/core/Snackbar";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import dayGrouper from "../../components/common/HealthInfo/DaywiseGroup";

const PatientHealthInformation = ({
  loadHealthData,
  dateArray,
  defaultSelectedDate,
  healthInfo,
  patientData,
  erroredEntiresCount,
  match
}) => {
  const isHealthInfoAvailable = !_.isEmpty(healthInfo);
  const areEntriesWithError = erroredEntiresCount > 0;
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const [snackbarOpen, setSnackbarOpen] = useState(areEntriesWithError);

  useEffect(() => {
    loadHealthData({ id: match.params.requestId, groupFunction: dayGrouper });
  }, []);

  useEffect(() => {
    setSelectedDate(defaultSelectedDate);
    setSnackbarOpen(areEntriesWithError);
  }, [defaultSelectedDate, areEntriesWithError]);

  const onChange = newSelectedDate => {
    setSelectedDate(newSelectedDate);
  };
  const handleSnackbarClose = () => setSnackbarOpen(false);

  return (
    <div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          elevation={6}
          variant="filled"
        >
          Failed to receive data from {erroredEntiresCount} Health Information
          Providers!
        </Alert>
      </Snackbar>
      <PatientDetails {...patientData} />
      {isHealthInfoAvailable ? (
        <div>
          <HealthInfoNav
            dates={dateArray}
            selectedDate={selectedDate}
            setSelectedDate={onChange}
          />
          <HealthInfoContainer
            consentReqId={match.params.requestId}
            healthInfo={healthInfo}
            selectedDate={selectedDate}
          />
        </div>
      ) : (
        <Alert severity="info">
          <AlertTitle>
            <strong>No Information</strong>
          </AlertTitle>
          Health information is unavailable for requested patient!
        </Alert>
      )}
    </div>
  );
};

export default PatientHealthInformation;
