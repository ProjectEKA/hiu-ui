import { takeEvery, all } from "redux-saga/effects";
import searchPatientSaga from "./searchPatientSaga";
import createConsentSaga from "./createConsentSaga";
import loadConsentsSaga from "./loadConsentsSaga";
import loadHealthDataSaga from "./loadHealthDataSaga";
import downloadPathologySaga from "./downloadPathologySaga";

function* rootSaga() {
  const sagas = [];
  for (const action in searchPatientSaga) {
    sagas.push(takeEvery(action, searchPatientSaga[action]));
  }
  for (const action in createConsentSaga) {
    sagas.push(takeEvery(action, createConsentSaga[action]));
  }
  for (const action in loadConsentsSaga) {
    sagas.push(takeEvery(action, loadConsentsSaga[action]));
  }
  for (const action in loadHealthDataSaga) {
    sagas.push(takeEvery(action, loadHealthDataSaga[action]));
  }
  for (const action in downloadPathologySaga) {
    sagas.push(takeEvery(action, downloadPathologySaga));
  }
  yield all(sagas);
}

export default rootSaga;
