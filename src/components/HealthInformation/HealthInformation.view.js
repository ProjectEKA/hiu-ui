import React from 'react';
import HealthInformationContent from './HealthInformationContent.view';

const HealthInformation = ({ consentReqId, healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : '';
  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map((hip) => (
      <HealthInformationContent
        consentReqId={consentReqId}
        hipName={hip.hipName}
        data={hip.data}
      />
    ))
  ) : (
    <div />
  );
};

export default HealthInformation;
