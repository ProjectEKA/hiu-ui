export const ACTION_TYPES = {
  CREATE_CONSENT_REQUESTED: 'CREATE_CONSENT_REQUESTED',
  CREATE_CONSENT_SUCCEEDED: 'CREATE_CONSENT_SUCCEEDED',
  CREATE_CONSENT_FAILED: 'CREATE_CONSENT_FAILED',
  CREATE_CONSENT_RESET_STATE: 'CREATE_CONSENT_RESET_STATE',
};
export const onCreateConsent = (payload) => ({
  type: ACTION_TYPES.CREATE_CONSENT_REQUESTED,
  payload,
});
export const onCreateConsentSuccess = (payload) => ({
  type: ACTION_TYPES.CREATE_CONSENT_SUCCEEDED,
  payload,
});
export const onCreateConsentFailure = (payload) => ({
  type: ACTION_TYPES.CREATE_CONSENT_FAILED,
  payload,
});

export const onCreateConsentResetState = () => ({
  type: ACTION_TYPES.CREATE_CONSENT_RESET_STATE,
});
