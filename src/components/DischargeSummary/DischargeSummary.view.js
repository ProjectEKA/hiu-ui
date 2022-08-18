import React from 'react';
import * as PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import useStyle from './DischargeSummary.style';
import { formatDateString } from '../common/HealthInfo/FhirResourcesUtils';

const DischargeSummary = ({ title, startDate, endDate, authors, status, date }) => {
  const classes = useStyle();
  const start = formatDateString(startDate);
  const end = formatDateString(endDate);
  return (
    title ? (
      <Grid container className={classes.container} justify='space-between'>
        <Grid item>
          <Typography variant='h6' color='inherit' className={classes.title}>
            Document: 
            {' '}
            {title}
          </Typography>
        </Grid>
        <Grid item className={classes.description}>
          {date && (
          <div>
            <span className={classes.label}>Date: </span>
            {date}
          </div>
)}
          {start && end && (
          <span className={classes.period}>
            Admitted from
            {start}
            {' '}
            to
            {end}
          </span>
)}
          {authors.length && (
          <div>
            <span className={classes.label}>Authors: </span>
            { authors.join(', ') }
          </div>
)}
          {status && (
          <div>
            <span className={classes.label}>Status: </span>
            {status.toUpperCase()}
          </div>
)}
        </Grid>
      </Grid>
    ) : ''
  );
};

DischargeSummary.propTypes = {
  title: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  authors: PropTypes.arrayOf(PropTypes.string),
  status: PropTypes.string,
  date: PropTypes.string,
};

DischargeSummary.defaultProps = {
  title: '',
  startDate: '',
  endDate: '',
  authors: [],
  status: '',
  date: '',
};


export default DischargeSummary;
