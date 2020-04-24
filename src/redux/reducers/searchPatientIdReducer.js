import { ACTION_TYPES } from '../actions/searchPatientIdActions';
import searchPatientInitialState from './searchPatientInitialState';

export default (state = searchPatientInitialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.PATIENT_FETCH_REQUESTED:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        serverError: false,
      };
    case ACTION_TYPES.PATIENT_FETCH_SUCCEEDED:
      return {
        ...state,
        patientData: action.payload.data,
        loading: false,
        success: true,
        error: false,
        serverError: false,
      };
    case ACTION_TYPES.PATIENT_FETCH_FAILED:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        serverError: false,
      };
    case ACTION_TYPES.PATIENT_FETCH_ID_NOT_FOUND:
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        serverError: false,
      };
    case ACTION_TYPES.PATIENT_FETCH_SERVER_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: false,
        serverError: true,
      };
    case ACTION_TYPES.PATIENT_FETCH_RESET_STATE:
      return {
        ...searchPatientInitialState,
        loading: false,
        success: false,
        error: false,
        serverError: false,
      };
    default:
      return state;
  }
};
