import React, { useEffect, useState } from "react";
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
  );
};

export default PatientHealthInformation;
