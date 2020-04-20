import { ACTION_TYPES } from "../actions/onSignInActions";
import { call, put } from "redux-saga/effects";
import signInApi from "../apiCalls/signInApi";
import history from "../../history";

function* onSignIn(action) {
  try {
    const User = yield call(signInApi, action.payload);
    if (User) {
      yield put({
        type: ACTION_TYPES.SIGNIN_SUCCEEDED,
        payload: User,
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.SIGNIN_FAILED,
      payload: e,
    });
  }
}

function* onSignInSuccess(action) {
  const pwdVerified = action.payload.data.isVerified;
  yield call(
    [localStorage, "setItem"],
    "auth-token",
    action.payload.data.accessToken
  );
  pwdVerified ? history.push(BASE_NAME) : history.push("/reset-password");
}

function* onSignInFailure(action) {
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.SIGNIN_REQUESTED]: onSignIn,
  [ACTION_TYPES.SIGNIN_SUCCEEDED]: onSignInSuccess,
  [ACTION_TYPES.SIGNIN_FAILED]: onSignInFailure,
};
