import React from "react";
import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTable";

const HealthInfoContainer = ({ healthInfo, selectedDate }) => {
  const healthInfoForSelectedDate = healthInfo ? healthInfo[selectedDate] : "";

  return healthInfoForSelectedDate ? (
    healthInfoForSelectedDate.map(hip => {
      return <DiagnosticReportTable hipName={hip.hipName} data={hip.data} />;
    })
  ) : (
    <div></div>
  );
};

export default HealthInfoContainer;
