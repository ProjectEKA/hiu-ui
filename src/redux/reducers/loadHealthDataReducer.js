import { ACTION_TYPES } from '../actions/loadHealthDataActions';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED:
      return {
        ...state,
        loading: true,
        error: false,
        success: false,
      };
    case ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS:
      return {
        ...state,
        healthData: action.payload.entryByDays,
        entriesCount: action.payload.entriesCountByStatus,
        loading: false,
        error: false,
        success: true,
      };
    case ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        success: false,
      };
    case ACTION_TYPES.FETCH_PATIENT_DATA:
      return {
        ...state,
        patientData: action.payload,
      };
    default:
      return state;
  }
};
