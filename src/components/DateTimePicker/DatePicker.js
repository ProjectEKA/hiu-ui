import React, { useState } from "react";
import { KeyboardDatePicker } from "@material-ui/pickers";

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = React.useState();

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  return (
    <KeyboardDatePicker
      disableToolbar
      variant="inline"
      format="MM/dd/yyyy"
      margin="normal"
      id="date-picker-inline"
      // label="Choose Date"
      value={selectedDate}
      onChange={handleDateChange}
      KeyboardButtonProps={{
        "aria-label": "change date"
      }}
    />
  );
};

export default DatePicker;
