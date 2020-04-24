import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../actions/createConsentActions';
import createConsentApi from '../apiCalls/createConsentApi';

function* createConsent(action) {
  try {
    const patient = yield call(createConsentApi, action.payload);
    if (patient) {
      yield put({
        type: ACTION_TYPES.CREATE_CONSENT_SUCCEEDED,
        payload: patient,
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.CREATE_CONSENT_FAILED,
      payload: e,
    });
  }
}

function* createConsentSuccess() {
  console.log('success message');
}

function* createConsentFailure(action) {
  console.log('failure message', action);
}

export default {
  [ACTION_TYPES.CREATE_CONSENT_REQUESTED]: createConsent,
  [ACTION_TYPES.CREATE_CONSENT_SUCCEEDED]: createConsentSuccess,
  [ACTION_TYPES.CREATE_CONSENT_FAILED]: createConsentFailure,
};
