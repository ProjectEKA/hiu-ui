import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Alert, AlertTitle } from "@material-ui/lab";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import { useParams } from "react-router-dom";
import dayGrouper from "../../components/common/HealthInfo/DaywiseGroup";

const PatientHealthInformation = ({
  loadHealthData,
  dateArray,
  defaultSelectedDate,
  healthInfo,
  patientData,
  match
}) => {
  const [selectedDate, setSelectedDate] = useState(defaultSelectedDate);
  const isHealthInfoAvailable = !_.isEmpty(healthInfo);

  useEffect(() => {
    loadHealthData({ id: match.params.requestId, groupFunction: dayGrouper });
  }, []);

  useEffect(() => {
    setSelectedDate(defaultSelectedDate);
  }, defaultSelectedDate);

  function onChange(newSelectedDate) {
    setSelectedDate(newSelectedDate);
  }
  
  return (
    <div>
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
          <AlertTitle><strong>No Information</strong></AlertTitle>
          Health information is unavailable for requested patient!
        </Alert>
      )}
    </div>
  );
};

export default PatientHealthInformation;
