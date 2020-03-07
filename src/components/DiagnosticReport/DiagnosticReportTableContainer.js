import React from "react";
import { connect } from "react-redux";
import DiagnosticReportTable from "./DiagnosticReportTable";
import { loadHealthData } from "../../redux/actions/loadHealthDataActions";
import { downloadPathology } from "../../redux/actions/downloadPathologyActions";
import getNestedObject from "../../utils/getNestedObject";

const mapStateToProps = state => ({
  healthInfo: getNestedObject(state, "healthInfo.healthData"),
  success: state.healthInfo.success,
  loading: state.healthInfo.loading,
  error: state.healthInfo.error
});

const mapDispatchToProps = {
  loadHealthData,
  downloadPathology
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DiagnosticReportTable);
