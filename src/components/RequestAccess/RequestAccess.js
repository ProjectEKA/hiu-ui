import React from "react";
import Button from "@material-ui/core/Button";
import RequestAccessStyles from "./RequestAccess.style";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const RequestAccess = () => {
  const options = ["dropdown text1", "dropdown text2", "dropdown text3"];
  return (
    <RequestAccessStyles>
      <h2>Consent request form</h2>
      <Autocomplete
        className="auto-complete"
        id="combo-box-demo"
        options={options}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
            className="text-field"
            {...params}
            label="Combo box"
            variant="outlined"
            fullWidth
          />
        )}
      />
      <Button className="submit-button" variant="contained" color="primary">
        Request Consent
      </Button>
    </RequestAccessStyles>
  );
};

export default RequestAccess;
