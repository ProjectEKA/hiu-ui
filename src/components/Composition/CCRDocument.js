import React from "react";

import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import {identifyParentOfType} from "../../components/common/HealthInfo/FhirResourcesUtils";

const CCRDocument = ({ consentReqId, data }) => {
  const independentObservations =  data ? 
    data.filter(entry => {
      if (entry.resourceType != "Observation") {
        return false;
      }
      if (entry.parentResources) {
        var parent = identifyParentOfType(entry, "Composition");
        return parent != undefined;
      }
      return false;
    }) : [];

  return (
    <div>
      CCR Document, Number of entries: {data.length}
      <ObservationTable data={independentObservations} />
      {/* <DiagnosticReportComponent consentReqId={consentReqId} data={data} /> */}
    </div>
  );
};

export default CCRDocument;
