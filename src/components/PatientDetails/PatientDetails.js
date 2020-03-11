import React from "react";

const PatientDetails = ({ patient }) => {
  return (
    <div>
      <span>
        Name:
        {patient.name}
      </span>
      <span>
        Age:
        {patient.age}
      </span>
    </div>
  );
};

export default PatientDetails;
