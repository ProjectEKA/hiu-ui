import React from "react";
import Typography from "@material-ui/core/Typography";
import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTable";
import HipHealthInfoContainerStyles from "./HipHealthInfoContainer.style";

const HipHealthInfoContainer = ({ hipName, data }) => {
  return (
    <HipHealthInfoContainerStyles>
      <Typography className="header" gutterBottom variant="h6" component="h2">
        {hipName}
      </Typography>
      <DiagnosticReportTable data={data} />
    </HipHealthInfoContainerStyles>
  );
};

export default HipHealthInfoContainer;
