import React from "react";
import HipHealthInfoContainer from "./HipHealthInfoContainer";

const HealthInfoContainer = ({ healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : "";

  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map(hip => {
      return <HipHealthInfoContainer hipName={hip.hipName} data={hip.data} />;
    })
  ) : (
    <div></div>
  );
};

export default HealthInfoContainer;
