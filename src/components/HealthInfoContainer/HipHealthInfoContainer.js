import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTable";
import ObservationTable from "../../components/ObservationTable/ObservationTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";
import CCRDocument from "../../components/Composition/CCRDocument";

const HipHealthInfoContainer = ({ consentReqId, hipName, data }) => {
  return (
    <HipHealthInfoContainerStyles>
      <div className="hip-health-info-container">
        <Typography className="header" gutterBottom variant="h5" component="h2">
          {hipName}
        </Typography>
        <CCRDocument consentReqId={consentReqId} data={data} />
        <ObservationTable data={data} />
        <DiagnosticReportTable consentReqId={consentReqId} data={data} />
      </div>
    </HipHealthInfoContainerStyles>
  );
};

export default HipHealthInfoContainer;
