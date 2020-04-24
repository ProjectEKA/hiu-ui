import React from 'react';
import Typography from '@material-ui/core/Typography';
import DiagnosticReportComponent from '../DiagnosticReport/DiagnosticReportComponent';
import ObservationTable from '../ObservationTable/ObservationTable';
import HealthInformationContentStyles from './HealthInformationContent.style';
import CCRDocument from '../Composition/CCRDocument';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import { identifyParentOfType } from '../common/HealthInfo/FhirResourcesUtils';
import ConditionsComponent from '../Condition/ConditionsComponent';

const HealthInformationContent = ({ consentReqId, hipName, data }) => {
  const compositionData = data
    ? data.filter((entry) => entry.resourceType.toLowerCase() == 'composition')
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
  data
    ? data.map((entry) => {
      if (entry.resourceType === 'Observation' && !entry.parentResources) {
        ObservationsWithNoParentResource.push(entry);
      }
    })
    : undefined;

  const DiagnosticReport = [];
  data
    ? data.map((entry) => {
      if (entry.resourceType === 'DiagnosticReport') {
        DiagnosticReport.push(entry);
      }
    })
    : undefined;

  const medicationRequests = data
    ? data.filter((entry) => {
      if (entry.resourceType != 'MedicationRequest') {
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
      if (entry.resourceType != 'Condition') {
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
      </div>
    </HealthInformationContentStyles>
  );
};

export default HealthInformationContent;
