import React from 'react';
import * as PropTypes from 'prop-types';

const ConditionNote = ({ condition }) => {
  if (condition.note && condition.note.length > 0) {
    return (
      <li>
        Note:&nbsp;
        <span>
          {' '}
          {condition.note
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

ConditionNote.propTypes = {
  condition: PropTypes.shape(conditionShape),
};

ConditionNote.defaultProps = {
  condition: {},
};

export default ConditionNote;
