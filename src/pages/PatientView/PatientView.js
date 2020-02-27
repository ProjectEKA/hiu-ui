import React from "react";
import ObservationTable from "../../components/ObservationTable/ObservationTableContainer";
import { useParams } from "react-router-dom";

const PatientView = ({ match }) => {
  return <ObservationTable consentRequestId={match.params.id} />;
};

export default PatientView;
