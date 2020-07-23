import React from 'react';
import * as PropTypes from 'prop-types';
import ObservationTable from '../ObservationTable/ObservationTable';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import {identifyParentOfType, formatDateString} from '../common/HealthInfo/FhirResourcesUtils';
import DischargeSummary from "../DischargeSummary/DischargeSummary.view";
import getNestedObject from "../../utils/getNestedObject";
import ConditionsComponent from "../Condition/ConditionsComponent";
import DiagnosticReportComponent from "../DiagnosticReport/DiagnosticReportComponent";
import Divider from '@material-ui/core/Divider';
import { getDate } from 'date-fns';
import DocumentReferenceComponent from '../DocumentReference/DocumentReferenceComponent';
import BinaryComponent from '../Binary/BinaryComponent';

const CompositionComponent = ({ composition, consentReqId, resources }) => {
    const isDischargeSummary = () => {
        const coding = getNestedObject(composition, 'type.coding');
        if (coding && coding.length) {
          return coding[0].system === 'http://loinc.org' && coding[0].code === '28655-9';
        }
        return false;
    };
    const getTitle = () => composition.title;
    const getStatus = () => composition.status;
    const getAuthor = (ref) => {
      if (!ref.targetResource) return undefined;
      if (!ref.targetResource.name) return undefined;
      return ref.targetResource.name[0].text;
    }
    const getAuthors = () => composition.author && composition.author.map((author) => author.display || getAuthor(author));
    const getDate =() => formatDateString(composition.date, true);

    const independentDataOfType = (resourceType) => {
        return(
            resources
            ? resources.filter((entry) => {
              if (entry.resourceType.toLowerCase() !== resourceType.toLowerCase()) {
                return false;
              }
              if (entry.parentResources) {
                const parent = entry.parentResources.find(pr => {
                    return pr === composition;
                });
                return parent !== undefined;
              }
              return false;
            }) : []
        );
    };

    return (
        <div style={{ marginBottom: 50 }}>
          <DischargeSummary
            title={getTitle()}
            authors={getAuthors()}
            status={getStatus()}
            date={getDate()}
          />
          <ObservationTable data={independentDataOfType('Observation')} />
          <MedicationRequestsComponent medicationRequests={independentDataOfType('MedicationRequest')} />
          <ConditionsComponent conditionList={independentDataOfType('Condition')} />
          <DiagnosticReportComponent consentReqId={consentReqId} data={independentDataOfType('DiagnosticReport')} />
          <DocumentReferenceComponent consentReqId={consentReqId} data={independentDataOfType('DocumentReference')} enclosed={true} />
          <BinaryComponent consentReqId={consentReqId} data={independentDataOfType('Binary')} enclosed={true} />
          {<Divider style={{ marginTop: 50 }} />}
        </div>
      );
};
export default CompositionComponent;