import React from "react";
import { connect } from "react-redux";
import ResetPassword from "./ResetPassword";
import { onResetPassword } from "../../redux/actions/onResetPasswordActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = (state) => ({
  error: getNestedObject(state, "resetPassword.error"),
});

const mapDispatchToProps = {
  onResetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
