import { combineReducers } from "redux";
import patientDetail from "./searchPatientIdReducer";
import createConsent from "./createConsentReducer";
import loadConsents from "./loadConsentsReducer";
import healthInfo from "./loadHealthDataReducer";
export default combineReducers({
  patientDetail,
  loadConsents,
  createConsent,
  healthInfo
});
