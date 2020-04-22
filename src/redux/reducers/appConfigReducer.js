import { APP_CONFIG_ACTION_TYPES } from "../actions/configAppActions";

export default (state = {}, action) => {
  switch (action.type) {
    case APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        cmList: action.payload.data.consentManagers,
      };
    case APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    default:
      return state;
  }
};
