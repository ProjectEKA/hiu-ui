import React, { useEffect } from "react";
import ObservationTable from "../../components/ObservationTable/ObservationTableContainer";
import DiagnosticReportTable from "../../components/DiagnosticReport/DiagnosticReportTableContainer";
import { useParams } from "react-router-dom";

const PatientView = ({ match }) => {
  return (
    <div>
      <DiagnosticReportTable consentRequestId={match.params.id} />
      <ObservationTable consentRequestId={match.params.id} />
    </div>
  );
};

export default PatientView;
