import React, { useState } from "react";
import * as PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import _ from "lodash";
import { getAccessToken, verify } from "../../auth";
import Config from "../../Config";

function SupportInformation() {
  return (
    <Container component="title" maxWidth="md">
      <Typography component="h1" variant="h5" style={{ textAlign: "center" }}>
        For access please send an email to <b>{Config.SUPPORT_EMAIL}</b> with your
        registered client id
      </Typography>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: 0,
  },
  formControl: {
    margin: theme.spacing(1, 0),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    paddingTop: 20,
    color: "#f44336",
  },
}));

export default function SignIn({ onSignIn, error }) {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const accessToken = getAccessToken();
  const { isTokenValid } = verify(accessToken);

  return (
    <div>
      {_.isNil(Config.SUPPORT_EMAIL) ? undefined : SupportInformation()}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {isTokenValid && <Redirect to="/" />}
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {error && (
            <span className={classes.error}>Invalid username or password.</span>
          )}
          <form className={classes.form}>
            <FormControl
              fullWidth
              className={classes.formControl}
              variant="outlined"
            >
              <TextField
                className={classes.textField}
                error={error}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="userName"
                label="User Name"
                name="userName"
                autoComplete="userName"
                autoFocus
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </FormControl>
            <FormControl
              fullWidth
              className={classes.formControl}
              variant="outlined"
            >
              <InputLabel required htmlFor="password">
                Password
              </InputLabel>
              <OutlinedInput
                error={error}
                variant="outlined"
                required
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Button
              disabled={userName === "" || password === ""}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(e) => {
                e.preventDefault();
                onSignIn({ userName, password });
              }}
            >
              Sign In
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}

SignIn.propTypes = {
  error: PropTypes.bool,
  onSignIn: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  error: false,
};
