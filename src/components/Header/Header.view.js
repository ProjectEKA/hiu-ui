import React from 'react';
import { Redirect } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Config from "../../Config";

const Header = () => {
  const logout = () => {
    localStorage.removeItem('auth-token');
    window.location.reload();
  };

  return (
    <>
      <AppBar color="textPrimary">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <Link href={Config.BASE_NAME}>
              LOGO
            </Link>
          </Typography>
          <Button color="primary" variant="contained" onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
