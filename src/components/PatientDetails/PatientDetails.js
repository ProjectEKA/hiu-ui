import React from "react";
import PatientDetailsStyles from "./PatientDetails.style";

const PatientDetails = ({ firstName, lastName }) => {
  return (
    <PatientDetailsStyles>
      <div className="patient-details-container">
        <span>
          Name : {firstName} {lastName}
        </span>
      </div>
    </PatientDetailsStyles>
  );
};

export default PatientDetails;
