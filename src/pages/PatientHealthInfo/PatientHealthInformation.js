import React, { useEffect } from "react";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import { useParams } from "react-router-dom";
import dayGrouper from "../../components/common/HealthInfo/DaywiseGroup";

const patient = {
  name: "john",
  age: 20
};

const DateArray = [
  "01/01/2000",
  "02/01/2000",
  "05/01/2000",
  "12/01/2000",
  "26/01/2000",
  "29/01/2000"
];
const selectedDate = "12/01/2000";

const PatientHealthInformation = ({ loadHealthData, match }) => {
  useEffect(() => {
    loadHealthData({ id: match.params.requestId, groupFunction: dayGrouper });
  }, []);
  return (
    <div>
      <PatientDetails patient={patient} />
      <HealthInfoNav dates={DateArray} selectedDate={selectedDate} />
      <HealthInfoContainer />
    </div>
  );
};

export default PatientHealthInformation;
