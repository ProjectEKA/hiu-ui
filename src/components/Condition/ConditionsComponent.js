import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
  getConceptDisplay,
  formatDateString
} from "../common/HealthInfo/FhirResourcesUtils";
import TableStyles from "./../../components/common/Styles/Table.style";

const ConditionNote = ({ condition }) => {
  if (condition.note && condition.note.length > 0) {
    return (
      <li>
        Note:&nbsp;
        <span>
          {" "}
          {condition.note
            .map(n => n.text)
            .reduce((acc, value) => acc + ", " + value)}{" "}
        </span>
      </li>
    );
  }
  return null;
};

const ConditionCategory = ({ condition }) => {
  if (condition.category) {
    var categories = [];
    condition.category.forEach(c => {
      var category = getConceptDisplay(c);
      if (category) {
        categories.push(category);
      }
    });
    if (categories.length > 0) {
      return (
        <span>
          {" "}
          {"( " +
            categories.reduce((acc, value) => acc + ", " + value) +
            " )"}{" "}
        </span>
      );
    }
  }
  return null;
};

const ConditionOnset = ({ condition }) => {
  if (condition.onsetDateTime) {
    return (
      <span>{"Onset time: " + formatDateString(condition.onsetDateTime)}</span>
    );
  }
  if (condition.onsetAge) {
    return (
      <span>
        {"Onset age: " +
          condition.onsetAge.value +
          " " +
          condition.onsetAge.unit}
      </span>
    );
  }

  if (condition.onsetPeriod) {
    return (
      <span>
        {"Period start: " +
          formatDateString(condition.onsetPeriod.start) +
          ", end: " +
          formatDateString(condition.onsetPeriod.end)}
      </span>
    );
  }

  if (condition.onsetRange) {
    return (
      <span>
        {"Range low: " +
          condition.onsetRange.low +
          ", high: " +
          condition.onsetRange.high}
      </span>
    );
  }

  if (condition.onsetString) {
    return <span>{"Onset " + condition.onsetString}</span>;
  }
  return null;
};

const ConditionsComponent = ({ conditionList }) => {
  return conditionList && conditionList.length > 0 ? (
    <TableStyles>
      <TableContainer className="table-container" component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header" colSpan={4}>
                Condition:
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell align="left">Recorded Date</TableCell>
              <TableCell align="left">Condition</TableCell>
              <TableCell align="left">Status</TableCell>
              <TableCell align="left">Additional Notes</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {conditionList.map((condition, i) => (
              <TableRow key={i}>
                <TableCell>
                  {condition.recordedDate
                    ? formatDateString(condition.recordedDate)
                    : ""}
                </TableCell>
                <TableCell>
                  {getConceptDisplay(condition.code)}
                  <ConditionCategory condition={condition} />
                </TableCell>
                <TableCell>
                  {"Severity: " +
                    (getConceptDisplay(condition.severity) || "Unspecified")}
                  <br />
                  {"Clinical Status: " +
                    (getConceptDisplay(condition.clinicalStatus) ||
                      "Unspecified")}
                  <br />
                  {"Verification Status: " +
                    (getConceptDisplay(condition.verificationStatus) ||
                      "Unspecified")}
                </TableCell>
                <TableCell>
                  <ul className="condition-list-item">
                    <li>
                      <ConditionOnset condition={condition} />
                    </li>
                    <ConditionNote condition={condition} />
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyles>
  ) : (
    <div></div>
  );
};

export default ConditionsComponent;
