import React, { useEffect, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DiagnosticReportTableStyles from "./DiagnosticReportTable.style";
import Typography from "@material-ui/core/Typography";
import valueForObs from "./ObsValueHandlers";
import { useParams } from "react-router-dom";

import { toIndiaDate } from "../../constants";

const DiagnosticReportTable = ({ data, consentReqId }) => {
  const entries = [];
  data
    ? data.map(entry => {
        if (entry.resourceType === "DiagnosticReport") {
          entries.push(entry);
        }
      })
    : undefined;

  const performerArray = [];
  function extractPerformer(entry) {
    if (entry.performer) {
      entry.performer.map(prmr => {
        performerArray.push(prmr.display);
      });
      return performerArray;
    }
    return undefined;
  }

  const PresentedForm = ({ entry }) => {
    return entry.presentedForm ? (
      <ul>
        {entry.presentedForm.map(link => {
          return (
            <li>
              <span>Presented form : </span>
              <a
                href={`${BACKEND_BASE_URL}/health-information/fetch/${consentReqId}${link.url}`}
              >
                {link.title ? link.title : "Link"}
              </a>
            </li>
          );
        })}
      </ul>
    ) : (
      <div></div>
    );
  };

  const Observations = ({ entry }) => {
    const Obs = entry.result;
    return Obs ? (
      <DiagnosticReportTableStyles>
        <TableContainer
          className="observation-table-container"
          component={Paper}
        >
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
              {Obs.map(Ob => {
                return (
                  <TableRow>
                    <TableCell align="left">
                      {Ob.targetResource.effectiveDateTime}
                    </TableCell>
                    <TableCell align="left">
                      {Ob.targetResource.code.text}
                    </TableCell>
                    <TableCell align="left">
                      {valueForObs(Ob.targetResource)}
                    </TableCell>
                    <TableCell align="left">
                      <div>{Ob.targetResource.status}</div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </DiagnosticReportTableStyles>
    ) : (
      <div></div>
    );
  };

  return entries && entries.length !== 0 ? (
    entries.map(entry => {
      return (
        <DiagnosticReportTableStyles>
          <TableContainer
            className="diagnostic-report-table-container"
            component={Paper}
          >
            <Typography className="header" variant="h6" component="h6">
              {entry.resourceType}
            </Typography>
            <ul className="report-details-list">
              <li>
                <span>Date: </span>
                {entry.effectiveDateTime
                  ? toIndiaDate(entry.effectiveDateTime)
                  : "-"}
              </li>
              <li>
                <span>Status: </span>
                {entry.status}
              </li>
              <li>
                <span>Report: </span>
                {entry.code ? entry.code.text : ""}
              </li>
              <li>
                <span>Performer: </span>
                {extractPerformer(entry)}
              </li>
            </ul>
            <Observations entry={entry} />
            <PresentedForm entry={entry} />
          </TableContainer>
        </DiagnosticReportTableStyles>
      );
    })
  ) : (
    <div></div>
  );
};

export default DiagnosticReportTable;
