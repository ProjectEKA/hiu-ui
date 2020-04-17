import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const privateRoute = ({ component: Component, history, ...rest }) => {
  const isAuth = localStorage.getItem("auth-token");
  return (
    <Route
      history={history}
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default withRouter(privateRoute);
