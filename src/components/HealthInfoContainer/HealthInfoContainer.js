import React from "react";
import HipHealthInfoContainer from "./HipHealthInfoContainer";

const HealthInfoContainer = ({ consentReqId, healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : "";

  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map(hip => {
      return (
        <HipHealthInfoContainer
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

export default HealthInfoContainer;
