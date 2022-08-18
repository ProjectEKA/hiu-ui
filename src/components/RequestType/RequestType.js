import React from 'react';
import * as PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import RequestTypeStyles from './RequestType.style';

const RequestType = ({ requestTypes, handleChange }) => (
  <Grid container>
    {requestTypes.map((type) => (
      <Grid item md={6} xs={12}>
        <FormControlLabel
          control={(
            <Checkbox
              className="check-box"
              checked={RequestType.checked}
              onChange={handleChange(type.value)}
              value={type.value}
              color="primary"
            />
          )}
          label={type.label}
          key={type.value}
        />
      </Grid>
    ))}
  </Grid>
);

RequestType.propTypes = {
  requestTypes: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.string,
  })),
  handleChange: PropTypes.func,
};

RequestType.defaultProps = {
  requestTypes: [],
  handleChange: {},
};

export default RequestType;
