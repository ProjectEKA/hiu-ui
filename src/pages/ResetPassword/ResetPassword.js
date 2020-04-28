import React, { useState } from 'react';
import * as PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  pageHeader: {
    margin: theme.spacing(0, 0, 3),
  },
  listItem: {
    padding: theme.spacing(0, 1),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  textField: {
    margin: 0,
  },
  formControl: {
    margin: theme.spacing(1, 0),
  },
  reset: {
    margin: theme.spacing(3, 0, 2),
  },
  error: {
    paddingTop: 20,
    color: '#f44336',
  },
}));

export default function ResetPassword({
  onResetPassword,
  error,
  errorMessage,
}) {
  const classes = useStyles();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography className={classes.pageHeader} component="h1" variant="h5">
          Reset Password
        </Typography>
        <Typography component="h6" variant="h6">
          Password Rules:
        </Typography>
        <List>
          <ListItem className={classes.listItem}>
            <ArrowRightIcon color="primary" />
            <ListItemText secondary="Password length should be 8-30" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ArrowRightIcon color="primary" />
            <ListItemText secondary="Should have at least 1 uppercase, lowercase, digit, special character" />
          </ListItem>
          <ListItem className={classes.listItem}>
            <ArrowRightIcon color="primary" />
            <ListItemText secondary="Cannot have three or more consecutive numbers" />
          </ListItem>
        </List>
        {error && <span className={classes.error}>{errorMessage}</span>}
        {newPassword !== '' &&
          confirmPassword !== '' &&
          newPassword !== confirmPassword && (
            <span className={classes.error}>
              New password and confirm password are different
            </span>
          )}
        <form className={classes.form}>
          <FormControl
            fullWidth
            className={classes.formControl}
            variant="outlined"
          >
            <TextField
              required
              type="text"
              id="old-password"
              label="Old Password"
              variant="outlined"
              value={oldPassword}
              autoComplete="old-password"
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </FormControl>
          <FormControl
            fullWidth
            className={classes.formControl}
            variant="outlined"
          >
            <InputLabel required htmlFor="new-password">
              New Password
            </InputLabel>
            <OutlinedInput
              variant="outlined"
              required
              name="newPassword"
              label="New Password"
              type={showNewPassword ? 'text' : 'password'}
              id="new-password"
              autoComplete="current-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowNewPassword(!showNewPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showNewPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <FormControl
            fullWidth
            className={classes.formControl}
            variant="outlined"
          >
            <InputLabel required htmlFor="confirm-password">
              Confirm Password
            </InputLabel>
            <OutlinedInput
              variant="outlined"
              required
              name="confirmPassword"
              label="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirm-password"
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              endAdornment={(
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              )}
            />
          </FormControl>
          <Button
            disabled={
              newPassword === '' ||
              confirmPassword === '' ||
              newPassword !== confirmPassword
            }
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.reset}
            onClick={(e) => {
              e.preventDefault();
              onResetPassword({ oldPassword, confirmPassword });
            }}
          >
            Reset
          </Button>
        </form>
      </div>
    </Container>
  );
}

ResetPassword.propTypes = {
  error: PropTypes.bool,
  errorMessage: PropTypes.string,
  onResetPassword: PropTypes.func.isRequired,
};

ResetPassword.defaultProps = {
  error: false,
  errorMessage: '',
};
