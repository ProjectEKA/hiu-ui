import React from "react";
import { IconButton, TextField } from "@material-ui/core";
import { ArrowLeft, ArrowRight } from "@material-ui/icons";

const HealthInfoNav = () => {
  return (
    <div>
      <IconButton
        type="button"
        className="icon-button"
        aria-label="search"
        theme="primary"
      >
        <ArrowLeft variant="outlined" theme="primary" />
      </IconButton>
      <TextField disabled={true} value="12/03/2010" />
      <IconButton
        type="button"
        className="icon-button"
        aria-label="search"
        theme="primary"
      >
        <ArrowRight variant="outlined" theme="primary" />
      </IconButton>
    </div>
  );
};

export default HealthInfoNav;
