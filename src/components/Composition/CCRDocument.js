import React from 'react';
import * as PropTypes from 'prop-types';
import ObservationTable from '../ObservationTable/ObservationTable';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import { identifyParentOfType } from '../common/HealthInfo/FhirResourcesUtils';
import DischargeSummary from "../DischargeSummary/DischargeSummary.view";

const CCRDocument = ({ compositionData }) => {
  const independentDataOfType = (resourceType) => {
    return(
      compositionData
        ? compositionData.filter((entry) => {
          if (entry.resourceType.toLowerCase() !== resourceType.toLowerCase()) {
            return false;
          }
          if (entry.parentResources) {
            const parent = identifyParentOfType(entry, 'Composition');
            return parent !== undefined;
          }
          return false;
        }) : []
    );
  };
  return compositionData && compositionData.length > 0 ? (
    <div>
      <ObservationTable data={independentDataOfType('Observation')} />
      <MedicationRequestsComponent medicationRequests={independentDataOfType('MedicationRequest')} />
    </div>
  ) : (
    <div />
  );
};

const compositionDataShape = PropTypes.shape({
  resourceType: PropTypes.string,
  parentResources: PropTypes.arrayOf(PropTypes.shape({
    resourceType: PropTypes.string,
  })),
});

CCRDocument.propTypes = {
  compositionData: PropTypes.arrayOf(compositionDataShape).isRequired,
};

export default CCRDocument;
