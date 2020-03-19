import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";
import CCRDocument from "../../components/Composition/CCRDocument";

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

  return (
    <HipHealthInfoContainerStyles>
      <div className="hip-health-info-container">
        <Typography className="header" gutterBottom variant="h5" component="h2">
          {hipName}
        </Typography>
        <CCRDocument consentReqId={consentReqId} data={compositionData} />
        <ObservationTable data={ObservationsWithNoParentResource} />
        <DiagnosticReportComponent
          consentReqId={consentReqId}
          data={DiagnosticReport}
        />
      </div>
    </HipHealthInfoContainerStyles>
  );
};

export default HipHealthInfoContainer;
