import React from 'react';
import PatientDetailsStyles from './PatientDetails.style';

const PatientDetails = ({ firstName }) => (
  <PatientDetailsStyles>
    <div className="patient-details-container">
      <span>
        Name :
        {firstName}
      </span>
    </div>
  </PatientDetailsStyles>
);

export default PatientDetails;
