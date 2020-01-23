import { ACTION_TYPES } from "../actions/createConsentActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.CREATE_CONSENT_REQUESTED:
      return {
        ...state,
        error: false,
        success: false
      };
    case ACTION_TYPES.CREATE_CONSENT_SUCCEEDED:
      return {
        ...state,
        error: false,
        success: true
      };
    case ACTION_TYPES.CREATE_CONSENT_FAILED:
      return {
        ...state,
        error: true,
        success: false
      };
    default:
      return state;
  }
};
