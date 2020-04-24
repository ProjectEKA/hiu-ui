import React from 'react';
import * as PropTypes from 'prop-types';

const MedicationNote = (props) => {
  const { mr } = props;
  if (mr.note && mr.note.length > 0) {
    return (
      <li>
        Note:&nbsp;
        <span>
          {mr.note.map((n) => n.text).reduce((acc, value) => `${acc}, ${value}`)}
        </span>
      </li>
    );
  }
  return null;
};

MedicationNote.propTypes = {
  mr: PropTypes.shape({
    note: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string,
    })),
  }),
};

MedicationNote.defaultProps = {
  mr: {
    note: [],
  },
};

export default MedicationNote;
