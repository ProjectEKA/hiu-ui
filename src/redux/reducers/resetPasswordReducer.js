import _ from 'lodash';
import { ACTION_TYPES } from '../actions/onResetPasswordActions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.RESET_PASSWORD_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ACTION_TYPES.RESET_PASSWORD_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case ACTION_TYPES.RESET_PASSWORD_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: _.first(
          _.get(action, 'payload.error.message', 'Something failed').split('\n')
        ),
        success: false,
      };
    default:
      return state;
  }
};
