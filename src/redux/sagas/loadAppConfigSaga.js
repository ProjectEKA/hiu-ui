import { call, put, takeEvery } from 'redux-saga/effects';
import {
  APP_INIT_ACTION_TYPES,
  fetchValueSetsSuccess,
  fetchValueSetsFailed,
} from '../actions/initAppActions';
import loadPurposeAndHiTypeValueSets from '../apiCalls/loadPurposeAndHiTypeConfigs';
import { ACTION_TYPES } from '../actions/onSignInActions';

export function* loadValueSets() {
  try {
    const valueSets = yield call(loadPurposeAndHiTypeValueSets);
    if (valueSets) {
      yield put(fetchValueSetsSuccess(valueSets.data));
    }
  } catch (e) {
    yield put(fetchValueSetsFailed(e));
  }
}

/* eslint-disable require-yield */
export function* watchSignIn() {
  takeEvery(ACTION_TYPES.SIGNIN_SUCCEEDED, loadValueSets);
}

export const appConfigActionObs = {
  [APP_INIT_ACTION_TYPES.FETCH_VALUESETS_REQUEST]: loadValueSets,
};
