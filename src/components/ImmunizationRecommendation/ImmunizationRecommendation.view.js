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
import _, { get } from 'lodash';
import {
  formatDateString,
  getConceptDisplay
} from '../common/HealthInfo/FhirResourcesUtils';
import TableStyles from '../common/Styles/Table.style';

const getDateCriterion = recommendation => {
  if (_.isEmpty(recommendation.dateCriterion)) {
    return 'NA';
  }

  let firstDateCriterion = _.first(recommendation.dateCriterion);

  return `${getConceptDisplay(firstDateCriterion.code)} : ${formatDateString(
    firstDateCriterion.value
  )}`;
};

const getVaccineDisplay = recommendation => {
  if (_.isEmpty(recommendation.vaccineCode)) {
    return 'NA';
  }

  return getConceptDisplay(_.first(recommendation.vaccineCode));
};

const ImmunizationRecommendationComponent = ({ recommendationList }) =>
  recommendationList && recommendationList.length > 0 ? (
    <TableStyles>
      <TableContainer className="table-container" component={Paper}>
        <Table className="table" aria-label="simple table">
          <TableHead>
            <TableRow className="table-head">
              <TableCell className="header" colSpan={4}>
                Immunization Recommendations:
              </TableCell>
            </TableRow>
            <TableRow className="table-head">
              <TableCell align="left">Vaccine</TableCell>
              <TableCell align="left">Target Disease</TableCell>
              <TableCell align="left">Date Criterion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recommendationList.map((recommendationResource, i) => {
              return recommendationResource.recommendation.map(
                recommendation => {
                  return (
                    <TableRow key={i}>
                      <TableCell className="table-cell">
                        {getVaccineDisplay(recommendation)}
                      </TableCell>
                      <TableCell className="table-cell">
                        {_.isNil(recommendation.targetDisease)
                          ? 'NA'
                          : getConceptDisplay(recommendation.targetDisease)}
                      </TableCell>
                      <TableCell className="table-cell">
                        {getDateCriterion(recommendation)}
                      </TableCell>
                    </TableRow>
                  );
                }
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </TableStyles>
  ) : (
    <div />
  );

const conceptShape = {
  text: PropTypes.string,
  coding: PropTypes.object
};

const immunizationShape = {
  vaccineCode: PropTypes.shape(conceptShape),
  targetDisease: PropTypes.shape(conceptShape)
};

ImmunizationRecommendationComponent.propTypes = {
  recommendationList: PropTypes.arrayOf(PropTypes.shape(immunizationShape))
};

ImmunizationRecommendationComponent.defaultProps = {
  recommendationList: []
};

export default ImmunizationRecommendationComponent;
