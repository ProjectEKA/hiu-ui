import { takeEvery, all } from 'redux-saga/effects';
import searchPatientSaga from './searchPatientSaga';
import createConsentSaga from './createConsentSaga';
import loadConsentsSaga from './loadConsentsSaga';
import loadHealthDataSaga from './loadHealthDataSaga';
import signInSaga from './signInSaga';
import { appConfigActionObs } from './loadAppConfigSaga';
import resetPasswordSaga from './resetPasswordSaga';
import loadCmConfigSaga from './loadCmConfigSaga';

function* rootSaga() {
  const sagas = [];
  Object.keys(searchPatientSaga).forEach((action) =>
    sagas.push(takeEvery(action, searchPatientSaga[action]))
  );
  Object.keys(createConsentSaga).forEach((action) =>
    sagas.push(takeEvery(action, createConsentSaga[action]))
  );
  Object.keys(loadConsentsSaga).forEach((action) =>
    sagas.push(takeEvery(action, loadConsentsSaga[action]))
  );
  Object.keys(loadHealthDataSaga).forEach((action) =>
    sagas.push(takeEvery(action, loadHealthDataSaga[action]))
  );
  Object.keys(signInSaga).forEach((action) =>
    sagas.push(takeEvery(action, signInSaga[action]))
  );
  Object.keys(resetPasswordSaga).forEach((action) =>
    sagas.push(takeEvery(action, resetPasswordSaga[action]))
  );
  Object.keys(appConfigActionObs).forEach((action) =>
    sagas.push(takeEvery(action, appConfigActionObs[action]))
  );
  Object.keys(loadCmConfigSaga).forEach((action) =>
    sagas.push(takeEvery(action, loadCmConfigSaga[action]))
  );
  yield all(sagas);
}

export default rootSaga;
