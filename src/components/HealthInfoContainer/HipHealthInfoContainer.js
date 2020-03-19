import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";

const HipHealthInfoContainer = ({ consentReqId, hipName, data }) => {
  const ObservationsWithNoParentResource = [];
  data
    ? data.map(entry => {
        if (entry.resourceType === "Observation" && !entry.parentResource) {
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
