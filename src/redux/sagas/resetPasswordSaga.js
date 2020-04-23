import { call, put } from 'redux-saga/effects';
import _ from 'lodash';
import { ACTION_TYPES } from '../actions/onResetPasswordActions';
import resetPasswordApi from '../apiCalls/resetPasswordApi';
import history from '../../history';

function* onResetPassword(action) {
  try {
    const User = yield call(resetPasswordApi, action.payload);
    if (User) {
      yield put({
        type: ACTION_TYPES.RESET_PASSWORD_SUCCEEDED,
        payload: User,
      });
    }
  } catch (e) {
    yield put({
      type: ACTION_TYPES.RESET_PASSWORD_FAILED,
      payload: _.get(e, 'response.data'),
    });
  }
}

function* onResetPasswordSuccess(action) {
  console.log('success message');
  localStorage.removeItem('auth-token');
  history.push('/login');
}

function* onResetPasswordFailure(action) {
  console.log('failure message', action);
}

export default {
  [ACTION_TYPES.RESET_PASSWORD_REQUESTED]: onResetPassword,
  [ACTION_TYPES.RESET_PASSWORD_SUCCEEDED]: onResetPasswordSuccess,
  [ACTION_TYPES.RESET_PASSWORD_FAILED]: onResetPasswordFailure,
};
