import React from 'react';
import * as PropTypes from 'prop-types';
import { KeyboardDateTimePicker } from '@material-ui/pickers';

const DateTimePicker = ({
  disableFuture,
  minDate,
  maxDate,
  selectedDate,
  handleDateChange,
  disablePast,
}) => (
  <KeyboardDateTimePicker
    autoOk="true"
    variant="inline"
    margin="normal"
    disableFuture={disableFuture}
    id="date-picker-dialog"
    format="dd/MM/yyyy HH:mm"
    minDate={minDate}
    maxDate={maxDate}
    value={selectedDate}
    onChange={handleDateChange}
    disablePast={disablePast}
    KeyboardButtonProps={{
      'aria-label': 'change date',
    }}
  />
);

DateTimePicker.propTypes = {
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disableFuture: PropTypes.bool,
  disablePast: PropTypes.bool,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  handleDateChange: PropTypes.func.isRequired,
};

DateTimePicker.defaultProps = {
  minDate: new Date(1900, 1, 1),
  maxDate: new Date(2100, 1, 1),
  disableFuture: false,
  disablePast: false,
};

export default DateTimePicker;
