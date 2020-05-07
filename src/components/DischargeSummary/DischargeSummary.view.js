import React from 'react';
import * as PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography";
import useStyle from './DischargeSummary.style';
import {formatDateString} from "../common/HealthInfo/FhirResourcesUtils";

const DischargeSummary = ({ title, startDate, endDate }) => {
    const classes  = useStyle();
    const start = formatDateString(startDate);
    const end = formatDateString(endDate);
    return(
        title ? (
          <Typography variant='h6' color='inherit' className={classes.container}>
            {title}
            { start && end && (
            <span className={classes.description}>
              Admitted from
              {' '}
              {start}
              {' '}
              to
              {' '}
              {end}
            </span>
              )}
          </Typography>
    ) : ''
    );
};

DischargeSummary.propTypes = {
    title: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
};

DischargeSummary.defaultProps = {
    title: '',
    startDate: '',
    endDate: '',
};


export default DischargeSummary;