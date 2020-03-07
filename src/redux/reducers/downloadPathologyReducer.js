import { ACTION_TYPES } from "../actions/downloadPathologyActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.DOWNLOAD_PATHOLOGY_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case ACTION_TYPES.DOWNLOAD_PATHOLOGY_SUCCESS:
      return {
        ...state,
        pathology: action.payload.data,
        loading: false,
        error: false,
        success: true
      };
    case ACTION_TYPES.DOWNLOAD_PATHOLOGY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };
    default:
      return state;
  }
};
