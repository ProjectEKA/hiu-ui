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

import { toIndiaDate } from "../../constants";
import getNestedObject from "./../../utils/getNestedObject";

const DiagnosticReportTable = ({ data }) => {
  return data ? (
    <DiagnosticReportTableStyles>
      <TableContainer component={Paper}>
        <Table className="observation-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell align="left">Report Date</TableCell>
              <TableCell align="left">Status of the report</TableCell>
              <TableCell align="left">Report</TableCell>
              <TableCell align="left">Result</TableCell>
              <TableCell align="left">Performer</TableCell>
            </TableRow>
          </TableHead>
          {data.map(entry => {
            return (
              <TableBody>
                <TableRow>
                  <TableCell align="left">
                    {entry.effectiveDateTime
                      ? toIndiaDate(entry.effectiveDateTime)
                      : "-"}
                  </TableCell>
                  <TableCell align="left">{entry.status}</TableCell>
                  <TableCell align="left">
                    {entry.code ? entry.code.text : ""}
                  </TableCell>
                  <TableCell align="left"></TableCell>
                  <TableCell align="left"></TableCell>
                </TableRow>
              </TableBody>
            );
          })}
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
