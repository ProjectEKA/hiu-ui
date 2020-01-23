import { takeEvery, all } from "redux-saga/effects";
import searchPatientSaga from "./searchPatientSaga";
import createConsentSaga from "./createConsentSaga";

function* rootSaga() {
  const sagas = [];
  for (const action in searchPatientSaga) {
    sagas.push(takeEvery(action, searchPatientSaga[action]));
  }
  for (const action in createConsentSaga) {
    sagas.push(takeEvery(action, createConsentSaga[action]));
  }
  yield all(sagas);
}

export default rootSaga;
