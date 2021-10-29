import React from 'react';
import * as PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ObservationTable from '../ObservationTable/ObservationTable';
import MedicationRequestsComponent from '../Medication/MedicationRequestsComponent';
import {getConceptDisplay, formatDateString} from '../common/HealthInfo/FhirResourcesUtils';
import ConditionsComponent from "../Condition/ConditionsComponent";
import DiagnosticReportComponent from "../DiagnosticReport/DiagnosticReportComponent";
import DocumentReferenceComponent from '../DocumentReference/DocumentReferenceComponent';
import BinaryComponent from '../Binary/BinaryComponent';
import AllergiesComponent from '../AllergyIntolerance';
import ImmunizationRecordComponent from '../ImmunizationRecord';

const CompositionSectionComponent = ({ composition, consentReqId, resources }) => {
    const resourcesInComposition = resources;
    const getSectionType = (section) =>  section.code && `${getConceptDisplay(section.code)  }:`;
    const resourcesInSection = (resourceType, section) => {
        return(
            resourcesInComposition
            ? resourcesInComposition.filter((entry) => {
                if (entry.resourceType.toLowerCase() !== resourceType.toLowerCase()) {
                    return false;
                }
                if (entry.parentResources) {
                    const parent = section && entry.parentResources.find(pr => {
                        return pr === section;
                    });
                    return parent !== undefined;
                }
                return false;
            }) : []
        );
    };

    const SectionHeader = ({ section}) => {
        return (
          <Toolbar>
            <Typography variant="h6">
              #
              {getSectionType(section)}  
              {' '}
              {section.title}
            </Typography>
          </Toolbar>
        );
    };

    return composition.section ? (
        composition.section.map( (section) => {
            return (
              <Box padding={1}>
                <SectionHeader section={section} />
                <ObservationTable data={resourcesInSection('Observation', section)} />
                <MedicationRequestsComponent medicationRequests={resourcesInSection('MedicationRequest', section)} />
                <ConditionsComponent conditionList={resourcesInSection('Condition', section)} />
                <AllergiesComponent allergies={resourcesInSection('AllergyIntolerance', section)} />
                <ImmunizationRecordComponent immunizationList={resourcesInSection('Immunization', section)} />
                <DiagnosticReportComponent consentReqId={consentReqId} data={resourcesInSection('DiagnosticReport', section)} />
                <DocumentReferenceComponent consentReqId={consentReqId} data={resourcesInSection('DocumentReference', section)} enclosed />
                <BinaryComponent consentReqId={consentReqId} data={resourcesInSection('Binary', section)} enclosed /> 
              </Box>
            );
        })
      ) : (
        <div />
      );
    
};
export default CompositionSectionComponent;