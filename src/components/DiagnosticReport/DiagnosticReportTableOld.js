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
import {
  generateObservableEntity,
  generateObservableEntityValue,
  generateObservableEntityStatusInterpretation,
  generateRowsForResults
} from "./DiagnosticReportTableHelperFunctions";
import IconButton from "@material-ui/core/IconButton";
import { ArrowDropDown, ArrowRight } from "@material-ui/icons";
import { toIndiaDate } from "../../constants";

const DiagnosticResults = ({ results, close }) => {
  return results
    ? results.map((result, i) => (
        <TableRow
          className={close ? "close" : ""}
          style={{ backgroundColor: "primary" }}
          key={i}
        >
          <TableCell></TableCell>
          <TableCell></TableCell>
          <TableCell>
            {generateObservableEntityStatusInterpretation(result)}
          </TableCell>
          <TableCell>{generateObservableEntity(result)}</TableCell>
          <TableCell>{generateObservableEntityValue(result)}</TableCell>
          <TableCell></TableCell>
        </TableRow>
      ))
    : null;
};

const DiagnosticReportTable = ({
  loadHealthData,
  healthInfo,
  downloadPathology,
  consentRequestId
}) => {
  const [close, setClose] = useState(0);
  useEffect(() => {
    loadHealthData(consentRequestId);
  }, []);

  function extractDiagnosticReport(healthInfo) {
    if (healthInfo && healthInfo.entries) {
      const ObservationData = healthInfo.entries[0].data;
      if (ObservationData) {
        const DiagnosticReport = ObservationData.entry.filter(
          item =>
            item.resource.resourceType === "DiagnosticReport" ||
            item.resource.resourceType === "Observation"
        );
        return DiagnosticReport;
      }
    }
    return undefined;
  }
  const DiagnosticReport = extractDiagnosticReport(healthInfo);
  const Results = DiagnosticReport && generateRowsForResults(DiagnosticReport);

  console.log("*Results*", Results);

  return DiagnosticReport ? (
    <DiagnosticReportTableStyles>
      <TableContainer component={Paper}>
        <Table className="observation-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell></TableCell>
              <TableCell align="left">Report Date</TableCell>
              <TableCell align="left">Status of the report</TableCell>
              <TableCell align="left">Report</TableCell>
              <TableCell align="left">Result</TableCell>
              <TableCell align="left">Performer</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                {Results ? (
                  close ? (
                    <IconButton
                      className="expand-button"
                      size="small"
                      onClick={() => setClose(!close)}
                      color="primary"
                    >
                      <ArrowRight />
                    </IconButton>
                  ) : (
                    <IconButton
                      className="expand-button"
                      size="small"
                      onClick={() => setClose(!close)}
                      color="primary"
                    >
                      <ArrowDropDown />
                    </IconButton>
                  )
                ) : null}
              </TableCell>
              <TableCell align="left">
                {toIndiaDate(DiagnosticReport[0].resource.effectiveDateTime)}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityStatusInterpretation(
                  DiagnosticReport[0].resource
                )}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityValue(DiagnosticReport[0].resource)}
              </TableCell>
              <TableCell
                align="left"
                onClick={() => downloadPathology(consentRequestId)}
              >
                Reportname_Link
              </TableCell>
              <TableCell align="left">
                {generateObservableEntity(DiagnosticReport[0].resource)}
              </TableCell>
            </TableRow>
            <DiagnosticResults results={Results} close={close} />
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
