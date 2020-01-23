export const ACTION_TYPES = {
  CREATE_CONSENT_REQUESTED: "CREATE_CONSENT_REQUESTED",
  CREATE_CONSENT_SUCCEEDED: "CREATE_CONSENT_SUCCEEDED",
  CREATE_CONSENT_FAILED: "CREATE_CONSENT_FAILED"
};
export const onCreateConsent = payload => ({
  type: ACTION_TYPES.CREATE_CONSENT_REQUESTED,
  payload
});
export const onCreateConsentSuccess = payload => ({
  type: ACTION_TYPES.CREATE_CONSENT_SUCCEEDED,
  payload
});
export const onCreateConsentFailure = () => ({
  type: ACTION_TYPES.CREATE_CONSENT_FAILED,
  payload
});
