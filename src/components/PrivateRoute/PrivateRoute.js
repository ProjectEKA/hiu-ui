import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import getNestedObject from "../../utils/getNestedObject";

const privateRoute = ({ success, component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("auth-token");
  return (
    <Route
      {...rest}
      render={(props) =>
        success || isAuth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  success: getNestedObject(state, "signIn.success"),
});

export default connect(mapStateToProps)(privateRoute);
