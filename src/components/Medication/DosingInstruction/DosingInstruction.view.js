import React from 'react';
import * as PropTypes from 'prop-types';
import DosageTiming from '../DosageTiming';
import DosingInstructionForPatient from '../DosingInstructionForPatient';
import DosingInstructionAsNeeded from '../DosingInstructionAsNeeded';

const DosingInstruction = (props) => {
  const { dosage } = props;
  return dosage ? (
    <div>
      <span>{dosage.text}</span>
      <br />
      <DosageTiming dosage={dosage} />
      <ul className="instruction-list-item">
        <DosingInstructionForPatient dosage={dosage} />
        <DosingInstructionAsNeeded dosage={dosage} />
      </ul>
    </div>
  ) : null;
};

DosingInstruction.propTypes = {
  dosage: PropTypes.shape({ text: PropTypes.string }),
};

DosingInstruction.defaultProps = {
  dosage: null,
};


export default DosingInstruction;
