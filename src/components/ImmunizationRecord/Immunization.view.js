/* eslint-disable react/no-array-index-key */
import React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {
  formatDateString,
  getConceptDisplay
} from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';

const ImmunizationRecordComponent = ({ immunizationList }) =>
  immunizationList && immunizationList.length > 0 ? (
    <TableStyles>
      <TableContainer className="table-container" component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header" colSpan={4}>
                Immunization Records:
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell align="left">Vaccine</TableCell>
              <TableCell align="left">Occurrence Date</TableCell>
              <TableCell align="left">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {immunizationList.map((immunization, i) => (
              <TableRow key={i}>
                <TableCell className="table-cell">
                  {getConceptDisplay(immunization.vaccineCode)}
                </TableCell>
                <TableCell className="table-cell">
                  {immunization.occurrenceDateTime
                    ? formatDateString(immunization.occurrenceDateTime)
                    : ''}
                </TableCell>
                <TableCell className="table-cell">
                  {immunization.status}
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

const conceptShape = {
  text: PropTypes.string,
  coding: PropTypes.object
};

const immunizationShape = {
  vaccineCode: PropTypes.shape(conceptShape),
  occurrenceDateTime: PropTypes.string,
  status: PropTypes.string
};

ImmunizationRecordComponent.propTypes = {
  immunizationList: PropTypes.arrayOf(PropTypes.shape(immunizationShape))
};

ImmunizationRecordComponent.defaultProps = {
  immunizationList: []
};

export default ImmunizationRecordComponent;
