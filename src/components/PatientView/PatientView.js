import React, { useEffect } from "react";
import ObservationTable from "../ObservationTable/ObservationTableContainer";
import { useParams } from "react-router-dom";

const PatientView = ({ match }) => {
  return (
    <div>
      <h2> Patient View</h2>
      <ObservationTable consentRequestId={match.params.id} />
    </div>
  );
};

export default PatientView;
