import { combineReducers } from 'redux';
import patientDetail from './searchPatientIdReducer';
import createConsent from './createConsentReducer';
import loadConsents from './loadConsentsReducer';
import healthInfo from './loadHealthDataReducer';
import pathology from './downloadPathologyReducer';
import resetPassword from './resetPasswordReducer';
import signIn from './signInReducer';
import { configValueSets } from './appInitReducer';
import cmConfig from './appConfigReducer';

export default combineReducers({
  patientDetail,
  loadConsents,
  createConsent,
  healthInfo,
  resetPassword,
  signIn,
  pathology,
  cmConfig,
  configValueSets,
});
