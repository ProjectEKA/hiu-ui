export const ACTION_TYPES = {
  PATIENT_FETCH_REQUESTED: "PATIENT_FETCH_REQUESTED",
  PATIENT_FETCH_SUCCEEDED: "PATIENT_FETCH_SUCCEEDED",
  PATIENT_FETCH_FAILED: "PATIENT_FETCH_FAILED"
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
