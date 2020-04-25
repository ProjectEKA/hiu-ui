import * as PropTypes from 'prop-types';
import React from 'react';
import DosingInstruction from '../DosingInstruction';

const MedicationDose = (props) => {
  const { dosageInstructions } = props;
  if (dosageInstructions && dosageInstructions.length > 0) {
    const instructions = dosageInstructions.map((instruction) => (
      <DosingInstruction key={instruction.text} dosage={instruction} />
    ));
    return <div>{instructions}</div>;
  }
  return null;
};

MedicationDose.propTypes = {
  dosageInstructions: PropTypes.arrayOf(PropTypes.shape({ text: PropTypes.string })),
};

MedicationDose.defaultProps = {
  dosageInstructions: [],
};

export default MedicationDose;
