import { call, put, takeEvery, all } from "redux-saga/effects";
import axios from "axios";
import { ACTION_TYPES } from "./actions/searchAction";

function* fetchPatient(action) {
  try {
    const patient = yield call(
      axios.get,
      `http://localhost:3000/patient/${action.payload}`
    );
    yield put({ type: "PATIENT_FETCH_SUCCEEDED", payload: patient });
  } catch (e) {
    yield put({ type: "PATIENT_FETCH_FAILED", message: e.message });
  }
}

function* fetchPatientSuccess() {
  console.log("success message");
}

function* fetchPatientFailure() {
  console.log("failure message");
}

function* rootSaga() {
  yield all([
    takeEvery(ACTION_TYPES.PATIENT_FETCH_REQUESTED, fetchPatient),
    takeEvery(ACTION_TYPES.PATIENT_FETCH_SUCCEEDED, fetchPatientSuccess),
    takeEvery(ACTION_TYPES.PATIENT_FETCH_FAILED, fetchPatientFailure)
  ]);
}

export default rootSaga;
