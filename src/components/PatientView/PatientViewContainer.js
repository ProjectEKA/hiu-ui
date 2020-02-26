import React from "react";
import { connect } from "react-redux";
import PatientView from "./PatientView";
import { loadHealthData } from "../../redux/actions/loadHealthDataActions";

const mapStateToProps = state => ({
  healthInfo: state.healthInfo,
  success: state.healthInfo.success,
  loading: state.healthInfo.loading,
  error: state.healthInfo.error
});

const mapDispatchToProps = {
  loadHealthData
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientView);
