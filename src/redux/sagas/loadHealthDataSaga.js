import { ACTION_TYPES } from "../actions/loadHealthDataActions";
import { call, put } from "redux-saga/effects";
import loadHealthDataApi from "../apiCalls/loadHealthDataApi";

function* loadHealthData(action) {
  try {
    const patientData = yield call(loadHealthDataApi, action.payload);
    if (patientData) {
      yield put({
        type: ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED,
        payload: patient
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE,
      payload: e
    });
  }
}

function* loadHealthDataSuccess() {
  console.log("success message");
}

function* loadHealthDataFailure(action) {
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED]: loadHealthData,
  [ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS]: loadHealthDataSuccess,
  [ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE]: loadHealthDataFailure
};
