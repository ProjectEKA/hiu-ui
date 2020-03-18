import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportComponent from "../../components/DiagnosticReport/DiagnosticReportComponent";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";

const HipHealthInfoContainer = ({ consentReqId, hipName, data }) => {
  return (
    <HipHealthInfoContainerStyles>
      <div className="hip-health-info-container">
        <Typography className="header" gutterBottom variant="h5" component="h2">
          {hipName}
        </Typography>
        <ObservationTable data={data} />
        <DiagnosticReportComponent consentReqId={consentReqId} data={data} />
      </div>
    </HipHealthInfoContainerStyles>
  );
};

export default HipHealthInfoContainer;
