import React from "react";
import Button from "@material-ui/core/Button";
import SearchInput from "@material-ui/core/Input";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";

const RequestAccess = () => {
  const options = ["dropdown text1", "dropdown text2", "dropdown text3"];
  return (
    <div>
      <h2>Request Access</h2>
      <SearchInput />
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={option => option.title}
        style={{ width: 300 }}
        renderInput={params => (
          <TextField
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
    </div>
  );
};

export default RequestAccess;
