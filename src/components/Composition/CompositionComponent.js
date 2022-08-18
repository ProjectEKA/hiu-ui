import React from 'react';
import * as PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import { Box } from '@material-ui/core';
import {formatDateString} from '../common/HealthInfo/FhirResourcesUtils';
import DischargeSummary from "../DischargeSummary/DischargeSummary.view";
import EncounterComponent from '../Encounter/EncounterComponent';
import CompositionSectionComponent from './CompositionSectionComponent';

const CompositionComponent = ({ composition, consentReqId, resources }) => {
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
        <Box border={1} padding={1}>
          <EncounterComponent composition={composition} />  
          <CompositionSectionComponent composition={composition} consentReqId={consentReqId} resources={resources} />
          <Divider style={{ marginTop: 50 }} />
        </Box>
      </div>
      );
};
export default CompositionComponent;