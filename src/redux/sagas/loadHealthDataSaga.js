import { call, put, select, take } from 'redux-saga/effects';
import {
  ACTION_TYPES,
  savePatientData,
} from '../actions/loadHealthDataActions';
import loadHealthDataApi from '../apiCalls/loadHealthDataApi';
import getNestedObject from '../../utils/getNestedObject';
import {
  loadConsents,
  GET_CONSENTS_ACTION_TYPES,
} from '../actions/loadConsentsActions';

const getPatientDataFromConsentState = (id, consentData) => {
  return consentData.find((currentConsent) => currentConsent.consentRequestId === id).patient;
};

function* loadHealthData(action) {
  try {
    const HealthData = yield call(loadHealthDataApi, action.payload.id);
    let consentState = yield select((state) =>
      getNestedObject(state, 'loadConsents.consentsList')
    );
    if (!consentState.length) {
      yield put(loadConsents());
      yield take(GET_CONSENTS_ACTION_TYPES.CONSENTS_FETCH_SUCCEEDED);
      consentState = yield select((state) =>
        getNestedObject(state, 'loadConsents.consentsList')
      );
    }
    const patientData = getPatientDataFromConsentState(
      getNestedObject(action, 'payload.id'),
      consentState
    );
    yield put(savePatientData(patientData));
    if (HealthData) {
      yield put({
        type: ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS,
        payload: action.payload.groupFunction
          ? action.payload.groupFunction(HealthData)
          : HealthData,
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE,
      payload: e,
    });
  }
}

export default {
  [ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED]: loadHealthData,
};
