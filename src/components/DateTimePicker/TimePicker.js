import React, { useState } from "react";
import { KeyboardTimePicker } from "@material-ui/pickers";

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = React.useState();

  const handleTimeChange = time => {
    setSelectedTime(time);
  };

  return (
    <KeyboardTimePicker
      margin="normal"
      id="time-picker"
      // label="Choose time"
      value={selectedTime}
      onChange={handleTimeChange}
      KeyboardButtonProps={{
        "aria-label": "change time"
      }}
    />
  );
};

export default TimePicker;
