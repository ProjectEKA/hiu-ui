import React, { useEffect } from "react";
import ObservationTable from "../ObservationTable/ObservationTable";
import { useParams } from "react-router-dom";

const PatientView = ({ loadHealthData, match }) => {
  useEffect(() => {
    loadHealthData(match.params.id);
  }, []);

  return (
    <div>
      <h2> Patient View</h2>
      <ObservationTable />
    </div>
  );
};

export default PatientView;
