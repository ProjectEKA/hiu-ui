import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import MedicationTableStyles from "./MedicationRequests.style";


const MedicationRequestsComponent = ({ medicationRequests }) => {
  function findMedicationName(medication) {
    if (medication) {
      var codeableConcept = medication.code;
      if (codeableConcept.coding) {
        return codeableConcept.coding[0].display ? 
        codeableConcept.coding[0].display : codeableConcept.coding[0].code;
      } else {
        return "unknown";
      }
    } else {
      return "unknown";
    }
    return entry.interpretation ? entry.interpretation[0].text : "-";
  }

  return medicationRequests && medicationRequests.length > 0 ? (
    <MedicationTableStyles>
      <TableContainer className="medication-table-container" component={Paper}>
        <Table className="medication-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Medication</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicationRequests.map((mr, i) => (
              <TableRow key={i}>
                <TableCell>
                  {mr.authoredOn ? mr.authoredOn : ""}
                </TableCell>
                <TableCell>{findMedicationName(mr.medicationReference.targetResource)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MedicationTableStyles>
  ) : (
    <div></div>
  );
};

export default MedicationRequestsComponent;
