import { GET_CONSENTS_ACTION_TYPES } from "../actions/loadConsentsActions";
import { call, put } from "redux-saga/effects";
import loadConsentsApi from "../apiCalls/loadConsentsApi";

function* loadConsents(action) {
  try {
    const consents = yield call(loadConsentsApi, action.payload);
    yield put({
      type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SUCCEEDED,
      payload: consents
    });
  } catch (e) {
    yield put({
      type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_FAILED,
      payload: e
    });
  }
}

function* loadConsentsSuccess(action) {
  console.log("success message", action.payload);
}

function* loadConsentsFailure(action) {
  if (action.payload.response.status === 500) {
    yield put({
      type: GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SERVER_ERROR,
      payload: action.payload
    });
  }
}

export default {
  [GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_REQUESTED]: loadConsents,
  [GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SUCCEEDED]: loadConsentsSuccess,
  [GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_FAILED]: loadConsentsFailure
};
