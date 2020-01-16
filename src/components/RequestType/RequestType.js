import React from "react";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormHelperText from "@material-ui/core/FormHelperText";
import RequestTypeStyles from "./RequestType.style";

const RequestType = () => {
  const RequestType = [
    "Patient history",
    "Medications",
    "Diagnosis lab",
    "Radiology lab",
    "Observations"
  ];

  const [state, setState] = React.useState({
    Patienthistory: true,
    Medications: false,
    Diagnosislab: false,
    Radiologylab: false,
    Observations: false
  });

  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };

  return (
    <RequestTypeStyles>
      <FormControl component="fieldset" className="formControl">
        <FormGroup>
          {RequestType.map(type => {
            return (
              <FormControlLabel
                control={
                  <Checkbox
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
