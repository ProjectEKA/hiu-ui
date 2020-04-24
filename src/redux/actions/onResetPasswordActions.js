export const ACTION_TYPES = {
  RESET_PASSWORD_REQUESTED: 'RESET_PASSWORD_REQUESTED',
  RESET_PASSWORD_SUCCEEDED: 'RESET_PASSWORD_SUCCEEDED',
  RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED',
};
export const onResetPassword = (payload) => ({
  type: ACTION_TYPES.RESET_PASSWORD_REQUESTED,
  payload,
});
export const onResetPasswordSuccess = (payload) => ({
  type: ACTION_TYPES.RESET_PASSWORD_SUCCEEDED,
  payload,
});
export const onResetPasswordFailure = (payload) => ({
  type: ACTION_TYPES.RESET_PASSWORD_FAILED,
  payload,
});
