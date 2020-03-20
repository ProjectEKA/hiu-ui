import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import ObservationTableStyles from "./ObservationTable.style";
import valueForObs from "./ObsValueHandlers";

const Components = ({ components }) => {
  return components
    ? components.map((component, i) => (
        <li style={{ backgroundColor: "primary" }} key={i}>
          <span>{component.code.text} : </span>
          <span>{component.valueString}</span>
        </li>
      ))
    : null;
};

const ObservationTable = ({ data }) => {
  function extractInterpretation(entry) {
    return entry.interpretation ? entry.interpretation[0].text : "";
  }

  return data && data.length !== 0 ? (
    <ObservationTableStyles>
      <TableContainer className="observation-table-container" component={Paper}>
        <Table className="observation-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Observation</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status and Interpretation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry, i) => (
              <TableRow key={i}>
                <TableCell>
                  {entry.effectiveDateTime ? entry.effectiveDateTime : ""}
                </TableCell>
                <TableCell>{entry.code.text}</TableCell>
                <TableCell>
                  {valueForObs(entry)}
                  <ul>
                    <Components components={entry.component} />
                  </ul>
                </TableCell>
                <TableCell>
                  <div>{entry.status}</div>
                  {extractInterpretation(entry)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ObservationTableStyles>
  ) : (
    <div></div>
  );
};

export default ObservationTable;
