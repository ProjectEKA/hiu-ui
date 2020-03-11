import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import DiagnosticReportTableStyles from "./DiagnosticReportTable.style";
import Typography from "@material-ui/core/Typography";

const DiagnosticReportTable = ({
  loadHealthData,
  healthInfo,
  consentRequestId
}) => {
  useEffect(() => {
    loadHealthData(consentRequestId);
  }, []);
  return healthInfo ? (
    <DiagnosticReportTableStyles>
      <Typography className="header" gutterBottom variant="h6" component="h2">
        {healthInfo.DiagnosticReport.resource_type}
      </Typography>
      <TableContainer
        className="diagnostic-report-table-container"
        component={Paper}
      >
        <Table className="diagnostic-report-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell align="left">Report Date</TableCell>
              <TableCell align="left">Report</TableCell>
              <TableCell align="left">Result</TableCell>
              <TableCell align="left">Performer</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {healthInfo.DiagnosticReport.data.map((row, i) => (
              <TableRow>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.observation}</TableCell>
                <TableCell>{}</TableCell>
                <TableCell>{row.performer}</TableCell>
                <TableCell>
                  {row.status_and_interpretation.status}
                  {row.status_and_interpretation.delimiter}
                  {row.status_and_interpretation.interpretation}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DiagnosticReportTableStyles>
  ) : (
    <DiagnosticReportTableStyles>
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
    </DiagnosticReportTableStyles>
  );
};

export default DiagnosticReportTable;
