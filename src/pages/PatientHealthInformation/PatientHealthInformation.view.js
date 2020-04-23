import React, { useEffect, useState } from "react";
import _ from "lodash";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import PatientDetails from "../../components/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav";
import HealthInformation from "../../components/HealthInformation";
import dayGrouper from "../../components/common/HealthInfo/DaywiseGroup";
import AlertBox from "../../components/AlertBox/AlertBox";
import Breadcrumb from "../../components/breadcrumbs/breadcrumbs";
import Header from "../../components/Header/Header";

const renderHealthInfo = (patientData, dates, selectedDate, onChange, reqID, healthInfo) => {
  return (
    <>
      <PatientDetails {...patientData} />
      <HealthInfoNav
        dates={dates}
        selectedDate={selectedDate}
        setSelectedDate={onChange}
      />
      <HealthInformation
        consentReqId={reqID}
        healthInfo={healthInfo}
        selectedDate={selectedDate}
      />
    </>
  );
};

const renderErrorMessage = () => {
  return (
    <AlertBox
      type="error"
      title="Error"
      message="Sorry! Couldn't fetch data."
    />
  );
};

const renderNoInfoMessage = patientData => {
  return (
    <>
      <PatientDetails {...patientData} />
      <AlertBox
        type="info"
        title="No Information"
        message="Health information is unavailable for requested patient!"
      />
    </>
  );
};

const renderLoadingMessage = () => {
  return (
    <AlertBox
      type="info"
      title="Loading..."
      message="Fetching data. Please wait!"
    />
  );
};

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

  let content = renderLoadingMessage();

  if (isHealthInfoAvailable) {
    content = renderHealthInfo(patientData, dateArray, selectedDate, onChange, match.params.id, healthInfo);
  } else if (error) {
    content = renderErrorMessage();
  } else if (success && !isHealthInfoAvailable) {
    content = renderNoInfoMessage(patientData);
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
      <Header />
      <Breadcrumb />
      {content}
    </div>
  );
};

export default PatientHealthInformation;
