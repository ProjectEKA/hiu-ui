import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Snackbar from '@material-ui/core/Snackbar';
import * as PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import RequestAccess from '../RequestAccess/RequestAccessContainer';
import LoadConsentsContainer from '../../components/ConsentsListTable/LoadConsentsContainer';
import Header from '../../components/Header';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 'calc(100vw - 100px)',
    maxWidth: 1024,
    height: 'calc(100vh - 100px)',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    [theme.breakpoints.down('sm')]: {
      width: 'calc(100vw - 40px)',
      height: 'calc(100vh - 40px)',
    },
  },
  button: {
    marginTop: 30,
    marginBottom: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  }
}));

const LandingPage = ({
  success,
  onCreateConsentResetState,
  onSearchResetState,
  loadConsents,
  loadConfigValueSets,
  loadCMConfigurations,
}) => {
  useEffect(() => {
    loadConfigValueSets();
    loadCMConfigurations();
  }, []);
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [modalOpen, setModalOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
    onCreateConsentResetState();
    onSearchResetState();
  };

  if (success && modalOpen) {
    handleClose();
    loadConsents();
    setSnackBarOpen(true);
  }

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const handleOpen = () => {
    setModalOpen(true);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={snackBarOpen}
        autoHideDuration={4000}
        onClose={handleSnackBarClose}
        message="Consent request initiated!"
      />
      <Header />
      <Button
        className={classes.button}
        type="button"
        variant="contained"
        onClick={handleOpen}
        color="primary"
      >
        New Consent Request
      </Button>
      <Modal open={modalOpen} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            className={classes.closeButton}
          >
            <CancelIcon />
          </IconButton>
          <RequestAccess />
        </div>
      </Modal>
      <LoadConsentsContainer />
    </div>
  );
};

LandingPage.propTypes = {
  success: PropTypes.bool,
  onCreateConsentResetState: PropTypes.func.isRequired,
  onSearchResetState: PropTypes.func.isRequired,
  loadConsents: PropTypes.func.isRequired,
  loadConfigValueSets: PropTypes.func.isRequired,
};

LandingPage.defaultProps = {
  success: false,
};

export default LandingPage;
