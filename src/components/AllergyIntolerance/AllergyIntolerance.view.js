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
import { formatDateString, getConceptDisplay } from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';
import AdditionalNotes from '../AdditionalNotes';

const AllergiesComponent = ({ allergies }) => (allergies && allergies.length > 0 ? (
  <TableStyles>
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            <TableCell className="header" colSpan={4}>
              Allergy Intolerance:
            </TableCell>
          </TableRow>
          <TableRow className="table-head">
            <TableCell align="left">Recorded Date</TableCell>
            <TableCell align="left">Allergy</TableCell>
            <TableCell align="left">Status</TableCell>
            <TableCell align="left">Notes</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {allergies.map((allergy, i) => (
            <TableRow key={i}>
              <TableCell className="table-cell">
                {allergy.recordedDate
                  ? formatDateString(allergy.recordedDate)
                  : ''}
              </TableCell>
              <TableCell className="table-cell">
                {getConceptDisplay(allergy.code)}
              </TableCell>
              <TableCell className="table-cell">
                {`Clinical Status: ${
                  getConceptDisplay(allergy.clinicalStatus)
                      || 'Unspecified'}`}
                <br />
                {`Verification Status: ${
                  getConceptDisplay(allergy.verificationStatus)
                      || 'Unspecified'}`}
              </TableCell>
              <TableCell className="table-cell">
                <ul>
                  <AdditionalNotes resource={allergy} />
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </TableStyles>
) : (
  <div />
));


const conceptShape = {
  test: PropTypes.string,
  coding: PropTypes.object,
};

const conditionShape = {
  recordedDate: PropTypes.instanceOf(Date),
  code: PropTypes.shape(conceptShape),
  severity: PropTypes.shape(conceptShape),
  clinicalStatus: PropTypes.shape(conceptShape),
  verificationStatus: PropTypes.shape(conceptShape),
};

AllergiesComponent.propTypes = {
  conditionList: PropTypes.arrayOf(PropTypes.shape(conditionShape)),
};

AllergiesComponent.defaultProps = {
  conditionList: [],
};

export default AllergiesComponent;
