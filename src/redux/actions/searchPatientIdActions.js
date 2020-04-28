export const ACTION_TYPES = {
  PATIENT_FETCH_REQUESTED: 'PATIENT_FETCH_REQUESTED',
  PATIENT_FETCH_SUCCEEDED: 'PATIENT_FETCH_SUCCEEDED',
  PATIENT_FETCH_FAILED: 'PATIENT_FETCH_FAILED',
  PATIENT_FETCH_ID_NOT_FOUND: 'PATIENT_FETCH_ID_NOT_FOUND',
  PATIENT_FETCH_SERVER_ERROR: 'PATIENT_FETCH_SERVER_ERROR',
  PATIENT_FETCH_RESET_STATE: 'PATIENT_FETCH_RESET_STATE',
};
export const onSearch = (payload) => ({
  type: ACTION_TYPES.PATIENT_FETCH_REQUESTED,
  payload,
});
export const onSearchSuccess = (payload) => ({
  type: ACTION_TYPES.PATIENT_FETCH_SUCCEEDED,
  payload,
});
export const onSearchFailure = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_FAILED,
  payload: {},
});

export const onSearchIdNotFound = (payload) => ({
  type: ACTION_TYPES.PATIENT_FETCH_ID_NOT_FOUND,
  payload,
});

export const onSearchServerFailure = (payload) => ({
  type: ACTION_TYPES.PATIENT_FETCH_SERVER_ERROR,
  payload,
});

export const onSearchResetState = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_RESET_STATE,
});
