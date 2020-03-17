import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import ObservationTableStyles from "./ObservationTable.style";
import Typography from "@material-ui/core/Typography";

const Components = ({ components }) => {
  return components
    ? components.map((component, i) => (
        <li style={{ backgroundColor: "primary" }} key={i}>
          <span>{component.observation} :</span>
          <span> {component.value} :</span>
          <span> {component.interpretationText}</span>
        </li>
      ))
    : null;
};

const ObservationTable = ({ loadHealthData, healthInfo, consentRequestId }) => {
  useEffect(() => {
    loadHealthData(consentRequestId);
  }, []);
  return healthInfo ? (
    <ObservationTableStyles>
      <Typography className="header" gutterBottom variant="h6" component="h2">
        {healthInfo.Observation.resource_type}
      </Typography>
      <TableContainer className="observation-table-container" component={Paper}>
        <Table className="observation-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              {Object.values(healthInfo.Observation.headings).map(
                (heading, i) => (
                  <TableCell align="left">{heading}</TableCell>
                )
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {healthInfo.Observation.data.map((row, i) => (
              <TableRow>
                <TableCell>{row.date}</TableCell>
                <TableCell>
                  {row.observation}
                  <ul>
                    <Components components={row.components} />
                  </ul>
                </TableCell>
                <TableCell>{row.value}</TableCell>
                <TableCell>
                  {row.status_and_interpretation.status}
                  <br />
                  {row.status_and_interpretation.interpretation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ObservationTableStyles>
  ) : (
    <ObservationTableStyles>
      <div className="loader-container">
        <CircularProgress
          id="loader"
          className="loader"
          variant="indeterminate"
          disableShrink
          size={24}
          thickness={4}
        />
      </div>
    </ObservationTableStyles>
  );
};

export default ObservationTable;
