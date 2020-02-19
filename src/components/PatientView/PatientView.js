import React, { useEffect } from "react";
import ObservationTable from "../ObservationTable/ObservationTable";

const PatientView = ({ loadHealthData }) => {
  useEffect(() => {
    loadHealthData();
  }, []);

  return (
    <div>
      <h2> Patient View </h2>
      <ObservationTable />
    </div>
  );
};

export default PatientView;
