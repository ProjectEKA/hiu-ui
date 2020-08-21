import React from 'react';
import * as PropTypes from 'prop-types';

const AdditionalNotes = ({ resource }) => {
  if (resource.note && resource.note.length > 0) {
    return (
      <li>
        Note:&nbsp;
        <span>
          {' '}
          {resource.note
            .map((n) => n.text)
            .reduce((acc, value) => `${acc}, ${value}`)}
          {' '}
        </span>
      </li>
    );
  }
  return null;
};

const conditionShape = PropTypes.shape({
  note: PropTypes.arrayOf(PropTypes.string),
});

AdditionalNotes.propTypes = {
  resource: PropTypes.shape(conditionShape),
};

AdditionalNotes.defaultProps = {
  resource: {},
};

export default AdditionalNotes;
