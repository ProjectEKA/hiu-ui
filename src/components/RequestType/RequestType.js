import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import RequestTypeStyles from "./RequestType.style";

const RequestType = ({ requestTypes, handleChange }) => {
  return (
    <RequestTypeStyles>
      <FormControl component="fieldset" className="formControl">
        <FormGroup>
          {requestTypes.map(type => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
                    className="check-box"
                    checked={RequestType.checked}
                    onChange={handleChange(type)}
                    value={type}
                    color="primary"
                  />
                }
                label={type}
                key={type}
              />
            );
          })}
        </FormGroup>
      </FormControl>
    </RequestTypeStyles>
  );
};

export default RequestType;
