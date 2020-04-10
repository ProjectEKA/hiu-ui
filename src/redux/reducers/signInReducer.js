import { ACTION_TYPES } from "../actions/onSignInActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.SIGNIN_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
        isLoggedIn: false,
      };
    case ACTION_TYPES.SIGNIN_SUCCEEDED:
      return {
        ...state,
        loading: false,
        error: false,
        success: true,
        isLoggedIn: true,
      };
    case ACTION_TYPES.SIGNIN_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};
