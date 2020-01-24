import React from "react";
import { connect } from "react-redux";
import SearchPatient from "./SearchPatient";
import { onSearch } from "../../redux/actions/searchPatientIdActions";

const mapStateToProps = state => ({
  patientId: state.patientDetail.result,
  loading: state.patientDetail.loading,
  success: state.patientDetail.success,
  error: state.patientDetail.error,
  serverError: state.patientDetail.serverError
});

const mapDispatchToProps = {
  onSearch
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPatient);
