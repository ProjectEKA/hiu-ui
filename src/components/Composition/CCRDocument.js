import React from "react";

import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTable";
import ObservationTable from "../../components/ObservationTable/ObservationTable";

const CCRDocument = ({ consentReqId, data }) => {
  return (
    <div>
        CCR Document: number
        <ObservationTable data={data} />
        <DiagnosticReportTable consentReqId={consentReqId} data={data} />
    </div>

  );
};

export default CCRDocument;
