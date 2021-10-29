import React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import DiagnosticReportComponent from '../DiagnosticReport/DiagnosticReportComponent';
import ObservationTable from '../ObservationTable/ObservationTable';
import HealthInformationContentStyles from './HealthInformationContent.style';
import CCRDocument from '../Composition/CCRDocument';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import {identifyParentOfType} from '../common/HealthInfo/FhirResourcesUtils';
import ConditionsComponent from '../Condition/ConditionsComponent';
import DocumentReferenceComponent from '../DocumentReference/DocumentReferenceComponent';

const HealthInformationContent = ({ consentReqId, hipName, data }) => {
  const compositionData = data
    ? data.filter((entry) => entry.resourceType.toLowerCase() === 'composition')
    : [];

  if (data) {
    data.forEach((e) => {
      if (e.parentResources) {
        const parentComposition = e.parentResources.find(
          (pr) => compositionData.indexOf(pr) >= 0,
        );
        if (parentComposition) {
          compositionData.push(e);
        }
      }
    });
  }

  const ObservationsWithNoParentResource = [];
  const DiagnosticReport = [];

  if (data) {
    data.forEach((entry) => {
      if (entry.resourceType === 'Observation' && !entry.parentResources) {
        ObservationsWithNoParentResource.push(entry);
      }

      if (entry.resourceType === 'DiagnosticReport' && !entry.parentResources) {
        DiagnosticReport.push(entry);
      }
    });
  }

  const medicationRequests = data
    ? data.filter((entry) => {
      if (entry.resourceType !== 'MedicationRequest') {
        return false;
      }
      if (entry.parentResources) {
        return !identifyParentOfType(entry, 'Composition');
      }
      return true;
    })
    : [];

  const conditionList = data
    ? data.filter((entry) => {
      if (entry.resourceType !== 'Condition') {
        return false;
      }
      if (entry.parentResources) {
        const resourceTypes = entry.parentResources.map((pr) => pr.resourceType);
        const unique = (value, index, list) => {
          return list.indexOf(value) === index
        }
        const uniqueTypes = resourceTypes.filter(unique);
        if ((uniqueTypes.length == 1) && (uniqueTypes.indexOf('MedicationRequest') >=0) ) {
          return false;
        }
        if ((uniqueTypes.length == 1) && (uniqueTypes.indexOf('Encounter') >=0) ) {
          return false;
        }
        return !identifyParentOfType(entry, 'Composition');
      }
      return true;
    })
    : [];
  
  const documentList = data
    ? data.filter((entry) => {
      if (entry.resourceType !== 'DocumentReference') {
        return false;
      }
      if (entry.parentResources) {
        return !identifyParentOfType(entry, 'Composition');
      }
      return true;
    })
    : [];

  return (
    <HealthInformationContentStyles>
      <div className="hip-health-info-container">
        <Typography className="header" gutterBottom variant="h5" component="h2">
          {hipName}
        </Typography>
        <CCRDocument
          consentReqId={consentReqId}
          compositionData={compositionData}
        />
        <ObservationTable data={ObservationsWithNoParentResource} />
        <DiagnosticReportComponent
          consentReqId={consentReqId}
          data={DiagnosticReport}
        />
        <ConditionsComponent conditionList={conditionList} />
        <MedicationRequestsComponent medicationRequests={medicationRequests} />
        <DocumentReferenceComponent consentReqId={consentReqId} data={documentList} enclosed={false} />
      </div>
    </HealthInformationContentStyles>
  );
};

const resourceShape = PropTypes.shape({
  resourceType: PropTypes.string,
  parentResources: PropTypes.arrayOf(PropTypes.shape({ resourceType: PropTypes.string })),
});

HealthInformationContent.propTypes = {
  consentReqId: PropTypes.string,
  hipName: PropTypes.string,
  data: PropTypes.arrayOf(resourceShape),
};

HealthInformationContent.defaultProps = {
  consentReqId: '',
  hipName: '',
  data: [],
};

export default HealthInformationContent;
