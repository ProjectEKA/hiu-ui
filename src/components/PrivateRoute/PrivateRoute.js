import React from "react";
import * as PropTypes from "prop-types";
import { Route, Redirect, withRouter } from "react-router-dom";
import { verify, getAccessToken } from "../../auth";

const RESET_PASSWORD_PATH = "/reset-password";

const PrivateRoute = ({ component: Component, history, ...rest }) => {
  const accessToken = getAccessToken();

  const render = (props) => {
    const { isTokenValid, isUserVerified } = verify(accessToken);
    if (!isTokenValid) {
      return <Redirect to="/login" />;
    }

    if (!isUserVerified) {
      return rest.path === RESET_PASSWORD_PATH ? (
        <Component {...props} />
      ) : (
        <Redirect to={RESET_PASSWORD_PATH} />
      );
    }
    return <Component {...props} />;
  };

  return <Route history={history} {...rest} render={render} />;
};

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  history: PropTypes.shape({
    go: PropTypes.func,
    goBack: PropTypes.func,
    goForward: PropTypes.func,
  }).isRequired,
};

export default withRouter(PrivateRoute);
