import React from "react";
import PatientsListTable from "../ConsentsListTable/ConsentsListTable";
import ResourceData from "../ConsentsListTable/ConsentsList";

const ConsentLog = () => (
    <div>
      <h2>All Consents</h2>
      <PatientsListTable PatientsList={ResourceData} />
      {}
    </div>
);

export default ConsentLog;
