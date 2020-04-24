import React, { useState } from 'react';
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

DatePicker.defaultProps = {
  minDate: {},
  disableFuture: false,
};

export default DatePicker;
