import React, {
  Fragment
} from "react";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const LandingPage = () => {
  const [open, setOpen] = useState(false);

  handleOpen = () => {
    setOpen(true);
  };

  handleClose = () => {
    setOpen(false);
  };

  return (<div>
    <Button type="button"
      variant="contained"
      onClick={handleOpen}
      color="primary" >
      Request Consent </Button> <Modal aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={
          open
        }
        onClose={
          handleClose
        } >
      <div style={
        modalStyle
      }
        className={
          classes.paper
        } >
        Test text </div> </Modal ></div>
  );
};

export default LandingPage;