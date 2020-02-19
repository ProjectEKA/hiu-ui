import React, { useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Styles from "../../constants/tableConstants";
import LoadConsents from "./ConsentsList";
import { toIndiaDate } from "../../constants";

const rows = getConsents();
let headerRow = createConsentModel(
  "Name",
  "Jataayu ID",
  "Request Status",
  "Consent granted on",
  "Consent expiry on",
  "",
  "consent Id"
);

function createConsentModel(
  name,
  jataayuId,
  requestStatus,
  consentGrantedDate,
  consentExpiryDate,
  consentId
) {
  return {
    name,
    jataayuId,
    requestStatus,
    consentGrantedDate,
    consentExpiryDate,
    consentId
  };
}

function getConsents() {
  let consents = [];

  function isGrantedConsent(status) {
    return status === "GRANTED";
  }

  function getPatientFullName(patient) {
    return patient.firstName + " " + patient.lastName;
  }

  for (let i = 0; i < LoadConsents.length; i++) {
    let consent = LoadConsents[i];
    if (consent != null) {
      if (isGrantedConsent(consent.status)) {
        consents.push(
          createConsentModel(
            getPatientFullName(consent.patient),
            consent.patient.id,
            "Consent granted",
            toIndiaDate(consent.createdAt),
            toIndiaDate(consent.permission.dataExpiryAt),
            consent.id
          )
        );
      } else {
        consents.push(
          createConsentModel(
            getPatientFullName(consent.patient),
            consent.patient.id,
            "Request sent",
            "-",
            "-",
            consent.id
          )
        );
      }
    }
  }

  return consents;
}

function fetchHealthData(id) {
  console.log("consent clicked", id);
}

const ConsentsListTable = ({ loadConsents }) => {
  useEffect(() => {
    loadConsents();
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table className={Styles().table} aria-label="simple table">
        <TableHead>
          {
            <TableRow className={Styles().tableHead}>
              <TableCell align="left">{headerRow.name}</TableCell>
              <TableCell align="left">{headerRow.jataayuId}</TableCell>
              <TableCell align="left">{headerRow.requestStatus}</TableCell>
              <TableCell align="left">{headerRow.consentGrantedDate}</TableCell>
              <TableCell align="left">{headerRow.consentExpiryDate}</TableCell>
              <TableCell align="left">{""}</TableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              onClick={() => {
                fetchHealthData(row.consentId);
              }}
              className={i % 2 !== 0 ? Styles().evenTableRow : ""}
              key={row.consentId}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.jataayuId}</TableCell>
              <TableCell align="left">{row.requestStatus}</TableCell>
              <TableCell align="left">{row.consentGrantedDate}</TableCell>
              <TableCell align="left">{row.consentExpiryDate}</TableCell>
              <TableCell align="left">
                <ArrowForwardIosIcon color="primary" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ConsentsListTable;
