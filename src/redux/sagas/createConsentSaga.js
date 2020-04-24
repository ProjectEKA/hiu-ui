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

export default {
  [ACTION_TYPES.CREATE_CONSENT_REQUESTED]: createConsent,
};
