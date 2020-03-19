import React from "react";

import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import MedicationRequestsComponent from "../../components/Medication/MedicationRequestsComponent";
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
  
  const independentMedicationRequests =  data ? 
    data.filter(entry => {
      if (entry.resourceType != "MedicationRequest") {
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
      Document type: TODO
      <ObservationTable data={independentObservations} />
      <MedicationRequestsComponent medicationRequests={independentMedicationRequests} />
      {/* <DiagnosticReportComponent consentReqId={consentReqId} data={data} /> */}
    </div>
  );
};

export default CCRDocument;
