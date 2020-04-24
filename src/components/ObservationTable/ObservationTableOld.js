// Disabled eslint as this component is unused.
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import { ArrowDropDown, ArrowRight } from '@material-ui/icons';
import ObservationTableStyles from './ObservationTable.style';
import {
  generateObservableEntity,
  generateObservableEntityValue,
  generateObservableEntityStatusInterpretation,
  generateRowsForMembers,
} from './ObservationTableHelperFunctions';

const ObservationMembers = ({ members, close }) => (members
  ? members.map((member, i) => (
    <TableRow
      className={close ? 'close' : ''}
      style={{ backgroundColor: 'primary' }}
      key={i}
    >
      <TableCell />
      <TableCell />
      <TableCell>{generateObservableEntity(member)}</TableCell>
      <TableCell>{generateObservableEntityValue(member)}</TableCell>
      <TableCell>
        {generateObservableEntityStatusInterpretation(member)}
      </TableCell>
    </TableRow>
  ))
  : null);

const ObservationTable = ({ loadHealthData, healthInfo, consentRequestId }) => {
  const [close, setClose] = useState(0);
  useEffect(() => {
    loadHealthData(consentRequestId);
  }, []);

  function extractObservations(healthInfo) {
    if (healthInfo && healthInfo.entries) {
      const ObservationData = healthInfo.entries[0].data;
      if (ObservationData) {
        const Observations = ObservationData.entry.filter(
          (item) => item.resource.resourceType === 'Observation',
        );
        return Observations;
      }
    }
    return undefined;
  }

  const Observations = extractObservations(healthInfo);
  const Members = Observations && generateRowsForMembers(Observations);

  return Observations ? (
    <ObservationTableStyles>
      <TableContainer component={Paper}>
        <Table className="observation-table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell />
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Observation</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status and Interpretation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={Observations.id}>
              <TableCell>
                {Members ? (
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
                {Observations[0].resource.effectiveDateTime}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntity(Observations[0].resource)}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityValue(Observations[0].resource)}
              </TableCell>
              <TableCell align="left">
                {generateObservableEntityStatusInterpretation(
                  Observations[0].resource,
                )}
              </TableCell>
            </TableRow>
            <ObservationMembers members={Members} close={close} />
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
