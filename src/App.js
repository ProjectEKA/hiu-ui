import React from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage/LoginPageContainer";
import LandingPage from "../src/pages/LandingPage/LandingPageContainer";
import PatientHealthInformation from "../src/pages/PatientHealthInfo/PatientHealthInformationContainer";
import PrivateRoute from "../src/components/PrivateRoute/PrivateRoute";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 90,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container className={classes.container}>
        <Router basename={BASE_NAME}>
          <Route render={() => <LoginPage />} path="/login" />
          <PrivateRoute component={LandingPage} path="/" exact />
          <PrivateRoute
            component={PatientHealthInformation}
            path="/health-info/:requestId"
          />
        </Router>
      </Container>
    </div>
  );
}

export default App;
