import React from "react";
import _ from "lodash";
import jwtDecode from "jwt-decode";
import { Route, Redirect, withRouter } from "react-router-dom";

const RESET_PASSWORD_PATH = "/reset-password";

const privateRoute = ({ component: Component, history, ...rest }) => {
  const accessToken = localStorage.getItem("auth-token");
  const isAuth = !_.isEmpty(accessToken);

  const render = props => {
    if (!isAuth) {
      return <Redirect to="/login" />;
    }
    const decodedToken = jwtDecode(accessToken);
    const { isVerified } = decodedToken;
    if (!isVerified) {
      return rest.path == RESET_PASSWORD_PATH ? (
        <Component {...props} />
      ) : (
        <Redirect to={RESET_PASSWORD_PATH} />
      );
    }
    return <Component {...props} />;
  };

  return <Route history={history} {...rest} render={render} />;
};

export default withRouter(privateRoute);
