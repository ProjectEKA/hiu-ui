import React from 'react';
import * as PropTypes from 'prop-types';

const DosingInstructionForPatient = (props) => {
  const { dosage } = props;
  if (dosage.patientInstruction) {
    return (
      <li>
        <span>
          Instruction to Patient:
          {dosage.patientInstruction}
        </span>
      </li>
    );
  }
  return null;
};

DosingInstructionForPatient.propTypes = {
  dosage: PropTypes.shape({
    patientInstruction: PropTypes.string,
  }),
};

DosingInstructionForPatient.defaultProps = {
  dosage: {
    patientInstruction: '',
  },
};

export default DosingInstructionForPatient;
