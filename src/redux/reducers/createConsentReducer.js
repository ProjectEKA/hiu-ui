import { ACTION_TYPES } from '../actions/createConsentActions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_CONSENT_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ACTION_TYPES.CREATE_CONSENT_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
      };
    case ACTION_TYPES.CREATE_CONSENT_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case ACTION_TYPES.CREATE_CONSENT_RESET_STATE:
      return {
        ...state,
        loading: false,
        error: false,
        success: false,
      };
    default:
      return state;
  }
};
