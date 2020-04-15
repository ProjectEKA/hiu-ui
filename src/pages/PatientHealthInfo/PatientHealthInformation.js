import React, { useEffect, useState } from "react";
import _ from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import dayGrouper from "../../components/common/HealthInfo/DaywiseGroup";
import AlertBox from "../../components/AlertBox/AlertBox";

const PatientHealthInformation = ({
  loadHealthData,
  error,
  success,
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

  let content = (
    <AlertBox
      type="info"
      title="Loading..."
      message="Fetching data. Please wait!"
    />
  );

  if (isHealthInfoAvailable) {
    content = (
      <>
        <PatientDetails {...patientData} />
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
      </>
    );
  } else if (error) {
    content = (
      <AlertBox
        type="error"
        title="Error"
        message="Sorry! Couldn't fetch data."
      />
    );
  } else if (success && !isHealthInfoAvailable) {
    content = (
      <>
        <PatientDetails {...patientData} />
        <AlertBox
          type="info"
          title="No Information"
          message="Health information is unavailable for requested patient!"
        />
      </>
    );
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          elevation={6}
          variant="filled"
        >
          Error in the data recieved from {erroredEntiresCount} Health
          Information Providers!
        </Alert>
      </Snackbar>
      {content}
    </div>
  );
};

export default PatientHealthInformation;
