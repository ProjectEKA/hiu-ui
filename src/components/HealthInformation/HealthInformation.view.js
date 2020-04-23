import React from "react";
import HealthInformationContent from "./HealthInformationContent.view";

const HealthInformation = ({ consentReqId, healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : "";
  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map(hip => {
      return (
        <HealthInformationContent
          consentReqId={consentReqId}
          hipName={hip.hipName}
          data={hip.data}
        />
      );
    })
  ) : (
    <div></div>
  );
};

export default HealthInformation;
