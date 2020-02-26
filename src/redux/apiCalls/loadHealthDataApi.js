import apiWrapper from "../apiWrapper";

const loadHealthDataApi = consentRequestId => {
  return apiWrapper("get", `/api/health-information/fetch/${consentRequestId}`);
};

export default loadHealthDataApi;
