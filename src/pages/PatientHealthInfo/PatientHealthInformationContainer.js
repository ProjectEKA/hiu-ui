import React from "react";
import { connect } from "react-redux";
import PatientHealthInformation from "./PatientHealthInformation";
import { loadHealthData } from "../../redux/actions/loadHealthDataActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = state => ({
  healthInfo: getNestedObject(state, "healthInfo.healthData"),
  success: state.healthInfo.success,
  loading: state.healthInfo.loading,
  error: state.healthInfo.error
});

const mapDispatchToProps = {
  loadHealthData
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PatientHealthInformation);
