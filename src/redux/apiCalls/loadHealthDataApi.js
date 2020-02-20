import apiWrapper from "../apiWrapper";

const loadHealthDataApi = consentRequestId => {
  return apiWrapper("get", `/health-information/fetch/${consentRequestId}`);
};

export default loadHealthDataApi;
