import React from "react";
import { connect } from "react-redux";
import PatientHealthInformation from "./PatientHealthInformation";
import { loadHealthData } from "../../redux/actions/loadHealthDataActions";
import getNestedObject from "../../utils/getNestedObject";

function extractDatesArray(data) {
  if (data) {
    return Object.keys(data);
  }
}

function extractSelectedDate(data) {
  if (data) {
    const dateArray = Object.keys(data);
    return dateArray[0];
  }
  return undefined;
}

const mapStateToProps = state => ({
  healthInfo: getNestedObject(state, "healthInfo.healthData"),
  dateArray: extractDatesArray(getNestedObject(state, "healthInfo.healthData")),
  defaultSelectedDate: extractSelectedDate(
    getNestedObject(state, "healthInfo.healthData")
  ),
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
