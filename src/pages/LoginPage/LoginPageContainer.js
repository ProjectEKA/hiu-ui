import React from "react";
import { connect } from "react-redux";
import LoginPage from "./LoginPage";
import { onSignIn } from "../../redux/actions/onSignInActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = state => ({
  // signInStatus: state.logIn
});

const mapDispatchToProps = {
  onSignIn
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
