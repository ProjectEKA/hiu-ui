import { call, put, takeEvery } from 'redux-saga/effects';
import { APP_INIT_ACTION_TYPES, fetchValueSetsSuccess, fetchValueSetsFailed } from '../actions/initAppActions';
import loadPurposeAndHiTypeValueSets from '../apiCalls/loadPurposeAndHiTypeConfigs';
import { ACTION_TYPES } from '../actions/onSignInActions';

export function* watchSignIn() {
  takeEvery(ACTION_TYPES.SIGNIN_SUCCEEDED, loadValueSets);
}

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

function* loadConfigValueSetSuccess(action) {
  console.log('success message', action.payload);
}

function* loadConfigValueSetFailure(action) {
  console.log('failure message', action);
}

export const appConfigActionObs = {
  [APP_INIT_ACTION_TYPES.FETCH_VALUESETS_REQUEST]: loadValueSets,
  [APP_INIT_ACTION_TYPES.FETCH_VALUESETS_SUCCESS]: loadConfigValueSetSuccess,
  [APP_INIT_ACTION_TYPES.FETCH_VALUESETS_FAILED]: loadConfigValueSetFailure,
};
