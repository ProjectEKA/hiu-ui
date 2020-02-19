import React from "react";
import { connect } from "react-redux";
import PatientView from "./PatientView";
import { loadHealthData } from "../../redux/actions/loadHealthDataActions";

const mapStateToProps = state => ({
  success: state.patientDetail.success,
  loading: state.patientDetail.loading,
  error: state.patientDetail.error
});

const mapDispatchToProps = {
  loadHealthData
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientView);
