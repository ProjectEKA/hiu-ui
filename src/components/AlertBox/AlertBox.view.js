import React from 'react';
import * as PropTypes from 'prop-types';
import { Alert, AlertTitle } from '@material-ui/lab';

const AlertBox = ({ type, title, message }) => (
  <Alert severity={type}>
    <AlertTitle>
      <strong>{title}</strong>
    </AlertTitle>
    {message}
  </Alert>
);

AlertBox.propTypes = {
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string,
};

AlertBox.defaultProps = {
  message: '',
};

export default AlertBox;
