import { call, put } from "redux-saga/effects";
import { APP_CONFIG_ACTION_TYPES } from "../actions/configAppActions";
import loadCmConfigApi from "../apiCalls/loadCmConfig";

function* fetchConfigRequest(action) {
  try {
    const Config = yield call(loadCmConfigApi);
    if (Config) {
      yield put({
        type: APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_SUCCESS,
        payload: Config,
      });
    }
  } catch (e) {
    yield put({
      type: APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_FAILED,
      payload: e,
    });
  }
}

function* fetchConfigRequestSuccess(action) {
  console.log("success message");
}

function* fetchConfigRequestFailure(action) {
  console.log("failure message", action);
}

export default {
  [APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_REQUEST]: fetchConfigRequest,
  [APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_SUCCESS]: fetchConfigRequestSuccess,
  [APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_FAILED]: fetchConfigRequestFailure,
};
