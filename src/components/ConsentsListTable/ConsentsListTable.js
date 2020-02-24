import React, { useEffect } from "react";
import { Link } from "react-router-dom";
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
            toIndiaDate(consent.createdDate),
            toIndiaDate(consent.expiredDate),
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

const ConsentsListTable = ({ loadConsents, ConsentsList }) => {
  console.log("###", ConsentsList);
  useEffect(() => {
    loadConsents();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className={Styles().table} aria-label="simple table">
        <TableHead>
          {
            <TableRow className={Styles().tableHead}>
              <TableCell>{headerRow.name}</TableCell>
              <TableCell>{headerRow.jataayuId}</TableCell>
              <TableCell>{headerRow.requestStatus}</TableCell>
              <TableCell>{headerRow.consentGrantedDate}</TableCell>
              <TableCell>{headerRow.consentExpiryDate}</TableCell>
              <TableCell>{""}</TableCell>
            </TableRow>
          }
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              className={i % 2 !== 0 ? Styles().evenTableRow : ""}
              key={row.consentId}
            >
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.jataayuId}</TableCell>
              <TableCell>{row.requestStatus}</TableCell>
              <TableCell>{row.consentGrantedDate}</TableCell>
              <TableCell>{row.consentExpiryDate}</TableCell>
              <TableCell>
                <Link to={`/patient-view/${row.consentId}`}>
                  <ArrowForwardIosIcon color="primary" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ConsentsListTable;
