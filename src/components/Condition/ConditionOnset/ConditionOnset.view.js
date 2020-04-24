import React from 'react';
import * as PropTypes from 'prop-types';
import { formatDateString } from '../../common/HealthInfo/FhirResourcesUtils';

const ConditionOnset = ({ condition }) => {
  if (condition.onsetDateTime) {
    return (
      <span>{`Onset time: ${formatDateString(condition.onsetDateTime)}`}</span>
    );
  }
  if (condition.onsetAge) {
    return (
      <span>
        {`Onset age: ${
          condition.onsetAge.value
        } ${
          condition.onsetAge.unit}`}
      </span>
    );
  }

  if (condition.onsetPeriod) {
    return (
      <span>
        {`Period start: ${
          formatDateString(condition.onsetPeriod.start)
        }, end: ${
          formatDateString(condition.onsetPeriod.end)}`}
      </span>
    );
  }

  if (condition.onsetRange) {
    return (
      <span>
        {`Range low: ${
          condition.onsetRange.low
        }, high: ${
          condition.onsetRange.high}`}
      </span>
    );
  }

  if (condition.onsetString) {
    return <span>{`Onset ${condition.onsetString}`}</span>;
  }
  return null;
};

const conditionShape = PropTypes.shape({
  onsetDateTime: PropTypes.array,
  onsetAge: PropTypes.shape({ value: PropTypes.string, unit: PropTypes.string }),
  onsetRange: PropTypes.shape({ low: PropTypes.object, high: PropTypes.object }),
  onsetPeriod: PropTypes.shape({ start: PropTypes.object, end: PropTypes.object }),
});

ConditionOnset.propTypes = {
  condition: PropTypes.shape(conditionShape),
};

ConditionOnset.defaultProps = {
  condition: {},
};

export default ConditionOnset;
