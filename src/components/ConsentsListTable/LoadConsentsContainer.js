import React from "react";
import { connect } from "react-redux";
import LoadConsents from "./ConsentsList";
import { loadConsents } from "../../redux/actions/loadConsentsActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = state => ({
  huiId: "1",
  success: state.loadConsents.success,
  loading: state.loadConsents.loading,
  error: state.loadConsents.error,
  serverError: state.loadConsents.serverError
});

const mapDispatchToProps = {
  loadConsents
};

export default connect(mapStateToProps, mapDispatchToProps)(LoadConsents);
