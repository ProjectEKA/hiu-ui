import React from 'react';
import * as PropTypes from 'prop-types';
import HealthInformationContent from './HealthInformationContent.view';

const HealthInformation = ({ consentReqId, healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : '';
  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map((hip) => (
      <HealthInformationContent
        key={hip.hipName}
        consentReqId={consentReqId}
        hipName={hip.hipName}
        data={hip.data}
      />
    ))
  ) : (
    <div />
  );
};

HealthInformation.propTypes = {
  healthInfo: PropTypes.shape({}),
  consentReqId: PropTypes.string,
  selectedDate: PropTypes.string,
};

HealthInformation.defaultProps = {
  healthInfo: null,
  consentReqId: '',
  selectedDate: '',
};

export default HealthInformation;
