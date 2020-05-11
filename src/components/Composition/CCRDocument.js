import React from 'react';
import * as PropTypes from 'prop-types';
import ObservationTable from '../ObservationTable/ObservationTable';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import {identifyParentOfType} from '../common/HealthInfo/FhirResourcesUtils';
import DischargeSummary from "../DischargeSummary/DischargeSummary.view";
import getNestedObject from "../../utils/getNestedObject";
import ConditionsComponent from "../Condition/ConditionsComponent";
import DiagnosticReportComponent from "../DiagnosticReport/DiagnosticReportComponent";

const CCRDocument = ({ compositionData, consentReqId }) => {
  const composition = compositionData.find(node => node.resourceType.toLowerCase() === "composition");
  const getTitle = () => composition && composition.title;
  const getStartDate = () => composition && composition.event[0] && getNestedObject(composition.event[0], 'period.start');
  const getEndDate = () => composition && composition.event[0] && getNestedObject(composition.event[0], 'period.end');
  const getStatus = () => composition && composition.status;
  const getAuthors = () => composition && composition.author && composition.author.map((author) => author.display);
  const isDischargeSummary = () => {
    const coding = composition && getNestedObject(composition, 'type.coding');
    if (coding && coding.length) {
      return coding[0].system === 'http://loinc.org' && coding[0].code === '28655-9';
    }
    return false;
  };

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
    <div style={{ marginBottom: 50 }}>
      {isDischargeSummary() &&
      <DischargeSummary
        title={getTitle()}
        startDate={getStartDate()}
        endDate={getEndDate()}
        authors={getAuthors()}
        status={getStatus()}
      />}
      <ObservationTable data={independentDataOfType('Observation')} />
      <MedicationRequestsComponent medicationRequests={independentDataOfType('MedicationRequest')} />
      <ConditionsComponent conditionList={independentDataOfType('Condition')} />
      <DiagnosticReportComponent consentReqId={consentReqId} data={independentDataOfType('DiagnosticReport')} />
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
  consentReqId: PropTypes.string.isRequired
};

export default CCRDocument;
