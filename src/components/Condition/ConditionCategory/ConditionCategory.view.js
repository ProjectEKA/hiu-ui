import React from 'react';
import * as PropTypes from 'prop-types';
import { getConceptDisplay } from '../../common/HealthInfo/FhirResourcesUtils';

const ConditionCategory = ({ condition }) => {
  if (condition.category) {
    const categories = [];
    condition.category.forEach((c) => {
      const category = getConceptDisplay(c);
      if (category) {
        categories.push(category);
      }
    });
    if (categories.length > 0) {
      return (
        <span>
          {' '}
          {`( ${
            categories.reduce((acc, value) => `${acc}, ${value}`)
          } )`}
          {' '}
        </span>
      );
    }
  }
  return null;
};

const conditionShape = PropTypes.shape({
  category: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
    coding: PropTypes.shape({
      code: PropTypes.string,
      display: PropTypes.string,
    }),
  })),
});

ConditionCategory.propTypes = {
  condition: PropTypes.shape(conditionShape),
};

ConditionCategory.defaultProps = {
  condition: {},
};

export default ConditionCategory;
