import React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { formatDateString, getConceptDisplay, getCodingDisplay, getFormattedDateString } from '../common/HealthInfo/FhirResourcesUtils';

const getEncDetails = (enc) => {
  const details = [getCodingDisplay(enc.class), enc.status];
  if (enc.period) {
    details.push(
      `${formatDateString(enc.period.start, true)
       }-${
       formatDateString(enc.period.end, true)}`
    );
  }
  return details.join(', ');
}

const getEncDiagnosis = (encounter) => {
  const diagnosis = encounter && encounter.diagnosis;
  if (diagnosis) {
     return diagnosis.map(diag => {
       if (diag.condition && diag.condition.targetResource) {
         return getConceptDisplay(diag.condition.targetResource.code);
       }
       return '';
     }).join(', ');

  }
  return undefined;
}

const EncounterComponent = ({ composition }) => {
  return composition.encounter ? (
    <div>
      <Typography variant="h6">Encounter:</Typography>
      <ul>
        <li key={`${composition.id  }Encounter` + `1`}>
          {getEncDetails(composition.encounter.targetResource)}
        </li>
        <li key={`${composition.id  }Encounter` + `2`}>
          {`Diagnosis: ${  getEncDiagnosis(composition.encounter.targetResource)}`}
        </li>
      </ul>
    </div>
  ) : (
    <div />
  );
};

EncounterComponent.defaultProps = {
  composition: null
};


export default EncounterComponent;