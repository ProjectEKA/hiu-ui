import { combineReducers } from "redux";
import patientDetail from "./searchPatientIdReducer";
import createConsent from './createConsentReducer';
export default combineReducers({
  patientDetail,
  createConsent
});
