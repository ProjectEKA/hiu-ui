import { ACTION_TYPES } from "../actions/searchPatientIdActions";

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENT_FETCH_REQUESTED:
      return {
        loading: true
      };
    case ACTION_TYPES.PATIENT_FETCH_SUCCEEDED:
      return {
        result: action.payload.data.email,
        loading: false
      };
    case ACTION_TYPES.PATIENT_FETCH_FAILED:
      return {
        loading: false
      };
    default:
      return state;
  }
};
