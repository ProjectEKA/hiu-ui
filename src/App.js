import React from "react";
import ContentContainer from "./components/Container/ContainerWrapper";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage/LoginPageContainer";
import LandingPage from "../src/pages/LandingPage/LandingPage";
import PatientHealthInformation from "../src/pages/PatientHealthInfo/PatientHealthInformationContainer";
import PrivateRoute from "../src/components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Container className="container">
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
