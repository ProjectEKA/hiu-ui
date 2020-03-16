import { ACTION_TYPES } from "../actions/loadHealthDataActions";
import { call, put } from "redux-saga/effects";
import loadHealthDataApi from "../apiCalls/loadHealthDataApi";

function* loadHealthData(action) {
  try {
    const HealthData = yield call(loadHealthDataApi, action.payload.id);
    if (HealthData) {
      yield put({
        type: ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS,
        payload: action.payload.groupFunction ? action.payload.groupFunction(HealthData) : HealthData
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE,
      payload: e
    });
  }
}

function* loadHealthDataSuccess(action) {
  console.log("success message", action.payload);
}

function* loadHealthDataFailure(action) {
  console.log("failure message", action.payload);
}

export default {
  [ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED]: loadHealthData,
  [ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS]: loadHealthDataSuccess,
  [ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE]: loadHealthDataFailure
};
