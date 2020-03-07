import { combineReducers } from "redux";
import patientDetail from "./searchPatientIdReducer";
import createConsent from "./createConsentReducer";
import loadConsents from "./loadConsentsReducer";
import healthInfo from "./loadHealthDataReducer";
import pathology from "./downloadPathologyReducer";
export default combineReducers({
  patientDetail,
  loadConsents,
  createConsent,
  healthInfo,
  pathology
});
