import { ACTION_TYPES } from "../actions/onSignInActions";
import { call, put } from "redux-saga/effects";
import signInApi from "../apiCalls/signInApi";
import history from "../../history";
import jwt_decode from "jwt-decode";

function* onSignIn(action) {
  try {
    const User = yield call(signInApi, action.payload);
    if (User) {
      yield put({
        type: ACTION_TYPES.SIGNIN_SUCCEEDED,
        payload: User
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.SIGNIN_FAILED,
      payload: e
    });
  }
}

function* onSignInSuccess(action) {
  yield call(
    [localStorage, "setItem"],
    "auth-token",
    action.payload.data.accessToken
  );
  history.push(BASE_NAME);
}

function* onSignInFailure(action) {
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.SIGNIN_REQUESTED]: onSignIn,
  [ACTION_TYPES.SIGNIN_SUCCEEDED]: onSignInSuccess,
  [ACTION_TYPES.SIGNIN_FAILED]: onSignInFailure
};
