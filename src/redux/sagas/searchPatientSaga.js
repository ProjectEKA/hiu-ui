import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../actions/searchPatientIdActions';
import fetchPatientApi from '../apiCalls/fetchPatientApi';

function* fetchPatient(action) {
  try {
    const patient = yield call(fetchPatientApi, action.payload);
    yield put({
      type: ACTION_TYPES.PATIENT_FETCH_SUCCEEDED,
      payload: patient,
    });
  } catch (e) {
    yield put({
      type: ACTION_TYPES.PATIENT_FETCH_FAILED,
      payload: e,
    });
  }
}

function* fetchPatientFailure(action) {
  if (action.payload.response.status === 404) {
    yield put({
      type: ACTION_TYPES.PATIENT_FETCH_ID_NOT_FOUND,
      payload: action.payload,
    });
  }
  if (action.payload.response.status === 500) {
    yield put({
      type: ACTION_TYPES.PATIENT_FETCH_SERVER_ERROR,
      payload: action.payload,
    });
  }
}

export default {
  [ACTION_TYPES.PATIENT_FETCH_REQUESTED]: fetchPatient,
  [ACTION_TYPES.PATIENT_FETCH_FAILED]: fetchPatientFailure,
};
