export const APP_INIT_ACTION_TYPES = {
  FETCH_VALUESETS_REQUEST: 'FETCH_VALUESETS_REQUEST',
  FETCH_VALUESETS_SUCCESS: 'FETCH_VALUESETS_SUCCESS',
  FETCH_VALUESETS_FAILED: 'FETCH_VALUESETS_FAILED',
};

export const fetchValueSetsRequest = () => ({
  type: APP_INIT_ACTION_TYPES.FETCH_VALUESETS_REQUEST,
});
export const fetchValueSetsSuccess = (valueSets) => ({
  type: APP_INIT_ACTION_TYPES.FETCH_VALUESETS_SUCCESS,
  payload: valueSets,
});
export const fetchValueSetsFailed = (error) => ({
  type: APP_INIT_ACTION_TYPES.FETCH_VALUESETS_FAILED,
  payload: error,
});
