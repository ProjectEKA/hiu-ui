import React, { useEffect } from "react";
import ContainerStyles from "./Container.style";
import routes from "../../routes";
import { Switch, Route, Redirect } from "react-router-dom";
import { RotateLeftSharp } from "@material-ui/icons";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import LandingPage from "./../../pages/LandingPage/LandingPage";
import LoginPage from "./../../pages/LoginPage/LoginPageContainer";

const Container = ({ isLoggedIn }) => {
  console.log("in containe");
  return (
    <ContainerStyles>
      <Switch>
        <PrivateRoute component={LandingPage} path="/" isExact />
        <Route render={() => <LoginPage />} path="/login" />
      </Switch>
    </ContainerStyles>
  );
};

export default Container;
