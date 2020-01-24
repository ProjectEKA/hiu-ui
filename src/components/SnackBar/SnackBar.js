import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import { Button, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

const SnackBar = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open={open}
      onClose={handleClose}
      message="Note archived"
      action={
        <React.Fragment>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
    />
  );
};

export default SnackBar;
