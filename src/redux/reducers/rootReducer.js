import { combineReducers } from "redux";
import patientDetail from "./searchPatientIdReducer";
import createConsent from "./createConsentReducer";
import loadConsents from "./loadConsentsReducer";
import healthInfo from "./loadHealthDataReducer";
import pathology from "./downloadPathologyReducer";
import signIn from "./signInReducer";
import { configValueSets } from "./appInitReducer"
export default combineReducers({
  patientDetail,
  loadConsents,
  createConsent,
  healthInfo,
  signIn,
  pathology,
  configValueSets
});
