import React, { useState } from "react";
import { KeyboardDateTimePicker } from "@material-ui/pickers";

const DateTimePicker = ({
  disableFuture,
  minDate,
  maxDate,
  selectedDate,
  handleDateChange,
  disablePast
}) => {
  return (
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
        "aria-label": "change date"
      }}
    />
  );
};

DateTimePicker.defaultProps = {
  disableFuture: false,
  minDate: {}
};

export default DateTimePicker;
