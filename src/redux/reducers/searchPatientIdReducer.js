import { ACTION_TYPES } from "../actions/searchPatientIdActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENT_FETCH_REQUESTED:
      return {
        ...state,
        loading: true
      };
    case ACTION_TYPES.PATIENT_FETCH_SUCCEEDED:
      return {
        ...state,
        result: action.payload.data.email,
        loading: false
      };
    case ACTION_TYPES.PATIENT_FETCH_FAILED:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};
