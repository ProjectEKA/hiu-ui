import React from "react";
import { connect } from "react-redux";
import LoadConsents from "./ConsentsListTable";
import { loadConsents } from "../../redux/actions/loadConsentsActions";

const mapStateToProps = state => ({
  hiuId: "1",
  success: state.loadConsents.success,
  loading: state.loadConsents.loading,
  error: state.loadConsents.error,
  serverError: state.loadConsents.serverError
});

const mapDispatchToProps = {
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadConsents);
