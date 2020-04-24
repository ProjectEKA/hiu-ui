import React from 'react';
import * as PropTypes from 'prop-types';

const MedicationPriority = (props) => {
  const { mr } = props;
  if (mr.priority) {
    return (
      <li>
        <span>
          Priority:
          {mr.priority}
        </span>
      </li>
    );
  }
  return null;
};

MedicationPriority.propTypes = {
  mr: PropTypes.shape({ priority: PropTypes.string }),
};

MedicationPriority.defaultProps = {
  mr: {
    priority: '',
  },
};

export default MedicationPriority;
