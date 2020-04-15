import React from "react";
import { connect } from "react-redux";
import ResetPassword from "./ResetPassword";
// import { onResetPassword } from "../../redux/actions/onSignInActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = (state) => ({
  // success: getNestedObject(state, "signIn.success"),
  // error: getNestedObject(state, "signIn.error"),
});

const mapDispatchToProps = {
  // onResetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
