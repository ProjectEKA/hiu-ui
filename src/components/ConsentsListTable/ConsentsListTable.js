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
// import ConsentsList from "./ConsentsList";
import { toIndiaDate } from "../../constants";

let headerRow = {
  name: "Name",
  jataayuId: "Jataayu ID",
  requestStatus: "Request Status",
  consentGrantedDate: "Consent granted on",
  consentExpiryDate: "Consent expiry on"
};

function isGrantedConsent(status) {
  return status === "GRANTED";
}

function getPatientFullName(patient) {
  return patient.firstName + " " + patient.lastName;
}

const ConsentsListTable = ({ loadConsents, ConsentsList }) => {
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
          {ConsentsList.map((consent, i) => (
            <TableRow
              className={i % 2 !== 0 ? Styles().evenTableRow : ""}
              key={consent.id}
            >
              <TableCell>{getPatientFullName(consent.name)}</TableCell>
              <TableCell>{consent.patient.id}</TableCell>
              <TableCell>
                {isGrantedConsent(consent.requestStatus)
                  ? "Consent granted"
                  : "Request sent"}
              </TableCell>
              <TableCell>
                {isGrantedConsent(consent.requestStatus)
                  ? toIndiaDate(consent.consentGrantedDate)
                  : "-"}
              </TableCell>
              <TableCell>
                {isGrantedConsent(consent.requestStatus)
                  ? toIndiaDate(consent.consentExpiryDate)
                  : "-"}
              </TableCell>
              <TableCell>
                {isGrantedConsent(consent.requestStatus) ? (
                  <Link to={`/patient-view/${consent.id}`}>
                    <ArrowForwardIosIcon color="primary" />
                  </Link>
                ) : (
                  ""
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ConsentsListTable;
