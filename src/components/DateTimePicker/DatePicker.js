import React from 'react';
import * as PropTypes from 'prop-types';
import { KeyboardDatePicker } from '@material-ui/pickers';

const DatePicker = ({
  disableFuture,
  minDate,
  selectedDate,
  handleDateChange,
}) => (
  <KeyboardDatePicker
    autoOk="true"
    variant="inline"
    margin="normal"
    disableFuture={disableFuture}
    id="date-picker-dialog"
    minDate={minDate}
    format="dd/MM/yyyy"
    value={selectedDate}
    onChange={handleDateChange}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
);

DatePicker.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  disableFuture: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  minDate: new Date(1900, 1, 1),
  disableFuture: false,
};

export default DatePicker;
