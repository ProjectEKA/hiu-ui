export const ACTION_TYPES = {
  DOWNLOAD_PATHOLOGY_REQUESTED: "DOWNLOAD_PATHOLOGY_REQUESTED",
  DOWNLOAD_PATHOLOGY_SUCCESS: "DOWNLOAD_PATHOLOGY_SUCCESS",
  DOWNLOAD_PATHOLOGY_FAILURE: "DOWNLOAD_PATHOLOGY_FAILURE"
};

export const downloadPathology = payload => ({
  type: ACTION_TYPES.DOWNLOAD_PATHOLOGY_REQUESTED,
  payload
});

export const downloadPathologySuccess = payload => ({
  type: ACTION_TYPES.DOWNLOAD_PATHOLOGY_SUCCESS,
  payload
});

export const downloadPathologyFailure = payload => ({
  type: ACTION_TYPES.DOWNLOAD_PATHOLOGY_FAILURE,
  payload
});
