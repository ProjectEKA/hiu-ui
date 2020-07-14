import React from 'react';
import * as PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';
import MedicationPriority from './MedicationPriority';
import MedicationNote from './MedicationNote';
import MedicationDose from './MedicationDose';


const findMedicationName = (mr) => {
  const medicationConcept 
    = (mr.medicationReference && mr.medicationReference.targetResource) 
      ? mr.medicationReference.targetResource.code 
      : mr.medicationCodeableConcept;
  if (!medicationConcept) return "Unspecified";
  if (medicationConcept.text) {
    return medicationConcept.text;
  }
  if (medicationConcept.coding) {
    return medicationConcept.coding[0].display
      ? medicationConcept.coding[0].display
      : medicationConcept.coding[0].code;
  }
  return 'Unspecified';
  
};

// eslint-disable-next-line max-len
const MedicationRequestsComponent = ({ medicationRequests }) => (medicationRequests && medicationRequests.length > 0 ? (
  <TableStyles>
    <TableContainer className="table-container" component={Paper}>
      <Table className="table" aria-label="simple table">
        <TableHead>
          <TableRow className="table-head">
            <TableCell className="header" colSpan={4}>
              Medication:
            </TableCell>
          </TableRow>
          <TableRow className="table-head">
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Medication</TableCell>
            <TableCell align="left">Dosing Instruction</TableCell>
            <TableCell align="left">Additional Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicationRequests.map((mr) => (
            <TableRow key={mr.authoredOn}>
              <TableCell className="table-cell">
                {mr.authoredOn ? formatDateString(mr.authoredOn) : ''}
              </TableCell>
              <TableCell className="table-cell">
                {findMedicationName(mr)}
                {` (${mr.status})`}
              </TableCell>
              <TableCell className="table-cell">
                <MedicationDose dosageInstructions={mr.dosageInstruction} />
              </TableCell>
              <TableCell className="table-cell">
                <ul className="mediation-list-item">
                  {<MedicationPriority mr={mr} />}
                  {<MedicationNote mr={mr} />}
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

const medicationRequestShape = {
  status: PropTypes.string,
  authoredOn: PropTypes.string,
  dosageInstruction: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string,
  })),
  medicationReference: PropTypes.shape({
    targetResource: PropTypes.shape({
      code: PropTypes.shape({
        coding: PropTypes.arrayOf(PropTypes.shape({
          code: PropTypes.string,
          display: PropTypes.string,
        })),
      }),
    }),
  }),
};

MedicationRequestsComponent.propTypes = {
  medicationRequests: PropTypes.arrayOf(PropTypes.shape(medicationRequestShape)),
};

MedicationRequestsComponent.defaultProps = {
  medicationRequests: [],
};

export default MedicationRequestsComponent;
