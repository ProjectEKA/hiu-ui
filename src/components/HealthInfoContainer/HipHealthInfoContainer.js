import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";
import CCRDocument from "../../components/Composition/CCRDocument";
import MedicationRequestsComponent from "../../components/Medication/MedicationRequestsComponent";
import {identifyParentOfType} from "../../components/common/HealthInfo/FhirResourcesUtils";

const HipHealthInfoContainer = ({ consentReqId, hipName, data }) => {
  const compositionData = data ? 
    data.filter(entry => entry.resourceType.toLowerCase() == "composition") : [];
  
  if (data) {
    data.forEach(e => {
      if (e.parentResources) {
        var parentComposition = e.parentResources.find(pr => compositionData.indexOf(pr) >= 0);
        if (parentComposition) {
          compositionData.push(e);
        }
      }
    });
  }

  const ObservationsWithNoParentResource = [];
  data
    ? data.map(entry => {
        if (entry.resourceType === "Observation" && !entry.parentResources) {
          ObservationsWithNoParentResource.push(entry);
        }
      })
    : undefined;

  const DiagnosticReport = [];
  data
    ? data.map(entry => {
        if (entry.resourceType === "DiagnosticReport") {
          DiagnosticReport.push(entry);
        }
      })
    : undefined;
  

  const medicationRequests =  data ? 
    data.filter(entry => {
      if (entry.resourceType != "MedicationRequest") {
        return false;
      }
      if (entry.parentResources) {
        return !identifyParentOfType(entry, "Composition");
      }
      return true;
    }) : [];

  return (
    <HipHealthInfoContainerStyles>
      <div className="hip-health-info-container">
        <Typography className="header" gutterBottom variant="h5" component="h2">
          {hipName}
        </Typography>
        <CCRDocument consentReqId={consentReqId} compositionData={compositionData} />
        <ObservationTable data={ObservationsWithNoParentResource} />
        <DiagnosticReportComponent
          consentReqId={consentReqId}
          data={DiagnosticReport}
        />
        <MedicationRequestsComponent medicationRequests={medicationRequests} />
      </div>
    </HipHealthInfoContainerStyles>
  );
};

export default HipHealthInfoContainer;
