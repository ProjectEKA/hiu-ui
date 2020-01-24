import React from "react";
import { connect } from "react-redux";
import RequestAccess from "./RequestAccess";
import { onCreateConsent } from "../../redux/actions/createConsentActions";

const mapStateToProps = state => ({
  patientId: state.patientDetail.patientData.patient
    ? state.patientDetail.patientData.patient.id
    : undefined,
  error: state.createConsent.error,
  success: state.createConsent.success
});

const mapDispatchToProps = {
  onCreateConsent
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestAccess);
