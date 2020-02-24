import React from "react";
import { connect } from "react-redux";
import LoadConsents from "./ConsentsListTable";
import { loadConsents } from "../../redux/actions/loadConsentsActions";

const mapStateToProps = state => ({
  ConsentsList: state.loadConsents.consents,
  success: state.loadConsents.success,
  loading: state.loadConsents.loading,
  error: state.loadConsents.error,
  serverError: state.loadConsents.serverError
});

const mapDispatchToProps = {
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadConsents);
