import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { formatDateString } from "../common/HealthInfo/FhirResourcesUtils";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compareDateStrings } from "../common/DateUtil";

const useStyles = makeStyles(theme => ({
  table: {
    clear: "both",
    backgroundColor: theme.palette.primary.main
  },
  title: {
    textTransform: "uppercase"
  }
}));

const ConsentsListTable = ({ loadConsents, consentsList, theme }) => {
  const classes = useStyles();
  useEffect(() => {
    loadConsents();
  }, []);

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

  

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        options={{
          headerStyle: {
            backgroundColor: "#009688",
            color: "#FFF"
          }
        }}
        className={classes.table}
        columns={[
          { title: headerRow.name, field: "name" },
          { title: headerRow.jataayuId, field: "id" },
          { title: headerRow.requestStatus, field: "status" },
          { title: headerRow.consentGrantedDate, field: "grantedOn", customSort: (a, b) => compareDateStrings(a.grantedOn,b.grantedOn) },
          { title: headerRow.consentExpiryDate, field: "expiredOn", customSort: (a, b) => compareDateStrings(a.expiredOn,b.expiredOn) },
          { title: "", field: "navLink", width: 50 }
        ]}
        data={consentsList.map(consent => ({
          name: getPatientFullName(consent.patient),
          id: consent.patient.id,
          status: isGrantedConsent(consent.status)
            ? "Consent granted"
            : "Request sent",
          grantedOn: isGrantedConsent(consent.status)
            ? formatDateString(consent.approvedDate, true)
            : "-",
          expiredOn: isGrantedConsent(consent.status)
            ? formatDateString(consent.expiredDate, true)
            : "-",
          navLink: isGrantedConsent(consent.status) ? (
            <Link to={`/health-info/${consent.id}`}>
              <ArrowForwardIosIcon color="primary" />
            </Link>
          ) : (
            ""
          )
        }))}
        title={
          <Typography className={classes.title} variant="h5">
            Consent List
          </Typography>
        }
      />
    </div>
  );
};

ConsentsListTable.defaultProps = {
  consentsList: []
};
export default ConsentsListTable;
