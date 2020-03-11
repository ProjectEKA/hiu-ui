import React from "react";
import PatientDetailsStyles from "./PatientDetails.style";

const PatientDetails = ({ patient }) => {
  return (
    <PatientDetailsStyles>
      <div className="patient-details-container">
        <span>
          Name:
          {patient.name}
        </span>
        <span>
          Age:
          {patient.age}
        </span>
      </div>
    </PatientDetailsStyles>
  );
};

export default PatientDetails;
