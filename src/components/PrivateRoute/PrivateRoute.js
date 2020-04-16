import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

const privateRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("auth-token");
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default withRouter(privateRoute);
