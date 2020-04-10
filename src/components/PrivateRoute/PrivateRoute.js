import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import getNestedObject from "../../utils/getNestedObject";

const privateRoute = ({ isLoggedIn, component: Component, ...rest }) => {
  console.log("isLoggedin", isLoggedIn);
  return (
    <Route
      {...rest}
      render={(props) =>
        isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isLoggedIn: getNestedObject(state, "signIn.isLoggedIn"),
});

export default connect(mapStateToProps)(privateRoute);
