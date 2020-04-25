import React from 'react';
import * as PropTypes from 'prop-types';
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

PatientDetails.propTypes = {
  firstName: PropTypes.string,
};

PatientDetails.defaultProps = {
  firstName: '',
};

export default PatientDetails;
