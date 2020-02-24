import React from "react";
import { connect } from "react-redux";
import LoadConsents from "./ConsentsListTable";
import { loadConsents } from "../../redux/actions/loadConsentsActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = state => ({
  ConsentsList: getNestedObject(state, "state.loadConsents.consents.data"),
  success: state.loadConsents.success,
  loading: state.loadConsents.loading,
  error: state.loadConsents.error,
  serverError: state.loadConsents.serverError
});

const mapDispatchToProps = {
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadConsents);
