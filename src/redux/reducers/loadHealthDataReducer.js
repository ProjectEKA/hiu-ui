import { ACTION_TYPES } from "../actions/loadHealthDataActions";
import transformData from "../../utils/transformHealthData";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };
    case ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS:
      return {
        ...state,
        healthData: action.payload.data,
        loading: false,
        error: false,
        success: true
      };
    case ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE:
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
