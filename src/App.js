import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import LoginPage from './pages/LoginPage/LoginPageContainer';
import ResetPassword from './pages/ResetPassword/ResetPasswordContainer';
import LandingPage from './pages/LandingPage/LandingPageContainer';
import PatientHealthInformation from './pages/PatientHealthInformation';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import history from './history';
import Config from "./Config";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: 90,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container className={classes.container}>
        <HashRouter basename={Config.BASE_NAME}>
          <Route history={history} component={LoginPage} path="/login" />
          <PrivateRoute
            component={ResetPassword}
            history={history}
            path="/reset-password"
          />
          <PrivateRoute
            component={LandingPage}
            history={history}
            path="/"
            exact
          />
          <PrivateRoute
            history={history}
            component={PatientHealthInformation}
            path="/health-info/:requestId"
          />
        </HashRouter>
      </Container>
    </>
  );
}

export default App;
