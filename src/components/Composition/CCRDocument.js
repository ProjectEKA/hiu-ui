import React from "react";

import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";

const CCRDocument = ({ consentReqId, data }) => {
  return (
    <div>
      CCR Document: number
      <ObservationTable data={data} />
      <DiagnosticReportComponent consentReqId={consentReqId} data={data} />
    </div>
  );
};

export default CCRDocument;
