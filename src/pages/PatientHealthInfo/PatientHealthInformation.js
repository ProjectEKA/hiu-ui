import React, { useEffect } from "react";
import PatientDetails from "../../components/PatientDetails/PatientDetails";
import HealthInfoNav from "../../components/HealthInfoNav/HealthInfoNav";
import HealthInfoContainer from "../../components/HealthInfoContainer/HealthInfoContainer";
import { useParams } from "react-router-dom";

function groupByDate(data) {
  console.log("***data", data);
  return data;
}

const patient = {
  name: "john",
  age: 20
};

const PatientHealthInformation = ({ loadHealthData, match }) => {
  useEffect(() => {
    loadHealthData({ id: match.params.requestId, groupFunction: groupByDate });
  }, []);
  return (
    <div>
      <PatientDetails patient={patient} />
      <HealthInfoNav />
      <HealthInfoContainer />
    </div>
  );
};

export default PatientHealthInformation;
