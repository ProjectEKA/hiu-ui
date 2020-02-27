import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CircularProgress from "@material-ui/core/CircularProgress";
import ObservationTableStyles from "./ObservationTable.style";
import {
  generateObservableEntity,
  generateObservableEntityValue,
  generateObservableEntityStatusInterpretation
} from "./ObservationTableHelperFunctions";

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

const ObservationTable = ({ loadHealthData, healthInfo, consentRequestId }) => {
  const classes = useStyles();
  useEffect(() => {
    loadHealthData(consentRequestId);
  }, []);

  function extractObservation(healthInfo) {
    if (healthInfo && healthInfo.entries) {
      const ObservationData = JSON.parse(healthInfo.entries[0].entry.content);
      if (ObservationData) {
        const Observation = ObservationData.entry.find(
          item => item.resource.resourceType === "Observation"
        ).resource;
        return Observation;
      }
    }
    return undefined;
  }

  const Observation = extractObservation(healthInfo);

  return Observation ? (
    <ObservationTableStyles>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow className={classes.tableHead}>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Observation</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status and Interpretation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={Observation.id}>
              <TableCell align="left">
                {Observation.effectiveDateTime}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntity(Observation)}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityValue(Observation)}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityStatusInterpretation(Observation)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </ObservationTableStyles>
  ) : (
    <ObservationTableStyles>
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
    </ObservationTableStyles>
  );
};
export default ObservationTable;
