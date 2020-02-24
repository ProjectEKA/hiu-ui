export const ACTION_TYPES = {
  FETCH_HEALTH_DATA_REQUESTED: "FETCH_HEALTH_DATA_REQUESTED",
  FETCH_HEALTH_DATA_SUCCESS: "FETCH_HEALTH_DATA_SUCCESS",
  FETCH_HEALTH_DATA_FAILURE: "FETCH_HEALTH_DATA_FAILURE"
};

export const loadHealthData = payload => ({
  type: ACTION_TYPES.FETCH_HEALTH_DATA_REQUESTED,
  payload
});

export const loadHealthDataSuccess = payload => ({
  type: ACTION_TYPES.FETCH_HEALTH_DATA_SUCCESS,
  payload
});

export const loadHealthDataFailure = payload => ({
  type: ACTION_TYPES.FETCH_HEALTH_DATA_FAILURE,
  payload
});
