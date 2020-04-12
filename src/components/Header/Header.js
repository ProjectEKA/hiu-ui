import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Redirect } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  header: {
    padding: theme.spacing(2, 0),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "fixed",
    top: 0,
    left: 0,
    background: "#fff",
    width: "100%",
    zIndex: "50",
  },
  logo: {
    marginLeft: "24",
    width: "80",
    height: "40",
    backgroundColor: "#dedede",
    color: "#fff",
    fontSize: "14",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  logout: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  const logout = () => {
    localStorage.removeItem("auth-token");
  };

  return (
    <Paper className={classes.header}>
      <a href={BASE_NAME} className={classes.logo}>
        logo
      </a>
      <Button
        variant="contained"
        color="primary"
        className={classes.logout}
        onClick={logout}
      >
        Logout
      </Button>
    </Paper>
  );
};

export default Header;
