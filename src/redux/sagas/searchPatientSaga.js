import { ACTION_TYPES } from "../actions/searchPatientIdActions";
import { call, put } from "redux-saga/effects";
import fetchPatientApi from "./../apiWrapper";

function* fetchPatient(action) {
  try {
    const patient = yield call(
      fetchPatientApi,
      "get",
      `${BACKEND_BASE_URL}/patients/${action.payload}`
    );
    if (patient) {
      yield put({
        type: ACTION_TYPES.PATIENT_FETCH_SUCCEEDED,
        payload: patient
      });
    }
  } catch (e) {
    yield put({ type: ACTION_TYPES.PATIENT_FETCH_FAILED, message: e });
  }
}

function* fetchPatientSuccess() {
  console.log("success message");
}

function* fetchPatientFailure(action) {
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.PATIENT_FETCH_REQUESTED]: fetchPatient,
  [ACTION_TYPES.PATIENT_FETCH_SUCCEEDED]: fetchPatientSuccess,
  [ACTION_TYPES.PATIENT_FETCH_FAILED]: fetchPatientFailure
};
