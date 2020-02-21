import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import generateObservationRows from "./ObservationTableContainer";
import ResourceData from "./ResourceData";
import FHIR from "fhirclient";
window.FHIR = FHIR;
// FHIR.oauth2.authorize({
//   client_id: "my_web_app",
//   scope: "observation/*.read"
// });

FHIR.oauth2
  .init({
    iss:
      "https://launch.smarthealthit.org/v/r3/sim/eyJoIjoiMSIsImIiOiJzbWFydC0xNjQyMDY4IiwiZSI6InNtYXJ0LVByYWN0aXRpb25lci03MTYxNDUwMiJ9/fhir",
    clientId: "123"
  })
  .then(client =>
    client
      .request("http://localhost:3000/api/observation", {
        resolveReferences: ["encounter", "observation", "medicationRequest"],
        graph: false
      })
      .then(data => {
        window.mydata = data;
        console.log("***", data);
      })
  );

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  tableHead: {
    backgroundColor: "#c8c8c8"
  },
  evenTableRow: {
    backgroundColor: "#f3f3f3"
  }
});

const Observation = ResourceData.entry.find(
  item => item.resource.resourceType === "Observation"
).resource;

const ObservationTable = () => {
  const classes = useStyles();
  const rows = generateObservationRows(Observation);
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell align="left" colSpan={4}>
              {Observation.resourceType}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, i) => (
            <TableRow
              className={
                row.type === "header"
                  ? classes.tableHead
                  : i % 2 !== 0 && classes.evenTableRow
              }
              key={row.key}
            >
              <TableCell align="left">{row.key}</TableCell>
              <TableCell align="left">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default ObservationTable;
