import { ACTION_TYPES } from "../actions/downloadPathologyActions";
import { call, put } from "redux-saga/effects";
import downloadPathologyApi from "../apiCalls/downloadPathologyApi";

function* downloadPathology(action) {
  try {
    const PathologyData = yield call(downloadPathologyApi, action.payload);
    console.log("++++++", PathologyData);
    if (PathologyData) {
      yield put({
        type: ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS,
        payload: HealthData
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE,
      payload: e
    });
  }
}

function* downloadPathologySuccess(action) {
  console.log("success message", action.payload);
}

function* downloadPathologyFailure(action) {
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.DOWNLOAD_PATHOLOGY_REQUESTED]: downloadPathology,
  [ACTION_TYPES.DOWNLOAD_PATHOLOGY_SUCCESS]: downloadPathologySuccess,
  [ACTION_TYPES.DOWNLOAD_PATHOLOGY_FAILURE]: downloadPathologyFailure
};
