import {
  ACTION_TYPES,
  onSignInFailure,
  onSignInSuccess
} from "../actions/onSignInActions";
import { call, put } from "redux-saga/effects";
import signInApi from "../apiCalls/signInApi";

function* onSignInSaga(action) {
  yield 1;
  console.log("sign In here");
  yield put(onSignInSuccess("fas"));
  yield put(onSignInFailure("asdf"));
}

function* onSignInSuccessSaga() {
  yield 1;
  console.log("success message");
}

function* onSignInFailureSaga(action) {
  yield 1;
  console.log("failure message", action);
}

export default {
  [ACTION_TYPES.SIGNIN_REQUESTED]: onSignInSaga,
  [ACTION_TYPES.SIGNIN_SUCCEEDED]: onSignInSuccessSaga,
  [ACTION_TYPES.SIGNIN_FAILED]: onSignInFailureSaga
};
