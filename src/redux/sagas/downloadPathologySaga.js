import { call, put } from 'redux-saga/effects';
import { ACTION_TYPES } from '../actions/downloadPathologyActions';
import downloadPathologyApi from '../apiCalls/downloadPathologyApi';

function* downloadPathology(action) {
  try {
    const PathologyData = yield call(downloadPathologyApi, action.payload);
    if (PathologyData) {
      yield put({
        type: ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS,
        payload: PathologyData,
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
  [ACTION_TYPES.DOWNLOAD_PATHOLOGY_REQUESTED]: downloadPathology,
};
