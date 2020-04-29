import React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import valueForObs from './ObsValueHandlers';
import TableStyles from '../common/Styles/Table.style';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';

export const Components = ({ components }) => (components
  ? components.map((component) => (
    <li style={{ backgroundColor: 'primary' }} key={component.valueString}>
      <span>
        {component.code.text}
        {' '}
        :
        {' '}
      </span>
      <span>{component.valueString}</span>
    </li>
  ))
  : null);

const ObservationTable = ({ data }) => {
  function extractInterpretation(entry) {
    return entry.interpretation ? entry.interpretation[0].text : '';
  }

  return data && data.length !== 0 ? (
    <TableStyles>
      <TableContainer className="table-container" component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header" colSpan={4}>
                Observation:
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Observation</TableCell>
              <TableCell align="left">Value</TableCell>
              <TableCell align="left">Status and Interpretation</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((entry) => (
              <TableRow
                key={`${entry.status}-${entry.id}`}
                className={entry.id ? 'children-row' : 'parent-row'}
              >
                {entry.id ? (
                  <TableCell className="table-cell" />
                ) : (
                  <TableCell className="table-cell">
                    {entry.effectiveDateTime
                      ? formatDateString(entry.effectiveDateTime)
                      : ''}
                  </TableCell>
                )}
                <TableCell className="table-cell">{entry.code.text}</TableCell>
                <TableCell className="table-cell">
                  {valueForObs(entry)}
                  <ul>
                    <Components components={entry.component} />
                  </ul>
                </TableCell>
                <TableCell className="table-cell">
                  <div>{entry.status}</div>
                  {extractInterpretation(entry)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyles>
  ) : (
    <div />
  );
};

ObservationTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})),
};

ObservationTable.defaultProps = {
  data: [],
};

export default ObservationTable;
