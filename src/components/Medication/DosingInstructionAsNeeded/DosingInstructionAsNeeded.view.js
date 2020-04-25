import React from 'react';
import * as PropTypes from 'prop-types';

const DosingInstructionAsNeeded = (props) => {
  const { dosage } = props;
  if (dosage.asNeededBoolean) {
    return (
      <li>
        <span>Take as needed</span>
      </li>
    );
  }
  return null;
};

DosingInstructionAsNeeded.propTypes = {
  dosage: PropTypes.shape({
    asNeededBoolean: PropTypes.bool,
  }),
};

DosingInstructionAsNeeded.defaultProps = {
  dosage: {
    asNeededBoolean: false,
  },
};

export default DosingInstructionAsNeeded;
