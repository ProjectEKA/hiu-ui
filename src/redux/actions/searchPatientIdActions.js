export const ACTION_TYPES = {
  PATIENT_FETCH_REQUESTED: "PATIENT_FETCH_REQUESTED",
  PATIENT_FETCH_SUCCEEDED: "PATIENT_FETCH_SUCCEEDED",
  PATIENT_FETCH_FAILED: "PATIENT_FETCH_FAILED",
  PATIENT_FETCH_ID_NOT_FOUND: "PATIENT_FETCH_ID_NOT_FOUND",
  PATIENT_FETCH_SERVER_ERROR: "PATIENT_FETCH_SERVER_ERROR"
};
export const onSearch = payload => ({
  type: ACTION_TYPES.PATIENT_FETCH_REQUESTED,
  payload
});
export const onSearchSuccess = payload => ({
  type: ACTION_TYPES.PATIENT_FETCH_SUCCEEDED,
  payload
});
export const onSearchFailure = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_FAILED,
  payload: {}
});

export const onSeatchIdNotFound = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_ID_NOT_FOUND,
  payload
});

export const onSearchServerFailure = () => ({
  type: ACTION_TYPES.PATIENT_FETCH_SERVER_ERROR,
  payload
});
