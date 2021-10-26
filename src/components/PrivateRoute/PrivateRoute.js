import React from 'react';
import * as PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { Route, Redirect, withRouter } from 'react-router-dom';

const RESET_PASSWORD_PATH = '/reset-password';

function verify(accessToken) {
  try {
    const decodedToken = jwtDecode(accessToken);
    const { isVerified, exp } = decodedToken;
    const currentTime = Date.now().valueOf();

    return {isTokenValid: currentTime < exp, isUserVerified: isVerified};
    
  } catch (e) {
    return {isTokenValid: false, isUserVerified: false};
  }
}

const PrivateRoute = ({ component: Component, history, ...rest }) => {
  const accessToken = localStorage.getItem('auth-token');
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
