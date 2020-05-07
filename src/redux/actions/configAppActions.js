export const APP_CONFIG_ACTION_TYPES = {
  FETCH_CONFIG_REQUEST: "FETCH_CONFIG_REQUEST",
  FETCH_CONFIG_SUCCESS: "FETCH_CONFIG_SUCCESS",
  FETCH_CONFIG_FAILED: "FETCH_CONFIG_FAILED",
};

export const fetchConfigRequest = () => ({
  type: APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_REQUEST,
});
export const fetchConfigSuccess = (config) => ({
  type: APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_SUCCESS,
  payload: config,
});
export const fetchConfigRequestFailure = (error) => ({
  type: APP_CONFIG_ACTION_TYPES.FETCH_CONFIG_FAILED,
  payload: error,
});
