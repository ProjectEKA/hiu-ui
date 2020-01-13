import { takeEvery, all } from "redux-saga/effects";
import searchPatientSaga from "./searchPatientSaga";

function* rootSaga() {
  const sagas = [];
  for (const action in searchPatientSaga) {
    sagas.push(takeEvery(action, searchPatientSaga[action]));
  }
  yield all(sagas);
}

export default rootSaga;
