export const ACTION_TYPES = {
  SIGNIN_REQUESTED: 'SIGNIN_REQUESTED',
  SIGNIN_SUCCEEDED: 'SIGNIN_SUCCEEDED',
  SIGNIN_FAILED: 'SIGNIN_FAILED',
};
export const onSignIn = (payload) => ({
  type: ACTION_TYPES.SIGNIN_REQUESTED,
  payload,
});
export const onSignInSuccess = (payload) => ({
  type: ACTION_TYPES.SIGNIN_SUCCEEDED,
  payload,
});
export const onSignInFailure = (payload) => ({
  type: ACTION_TYPES.SIGNIN_FAILED,
  payload,
});
