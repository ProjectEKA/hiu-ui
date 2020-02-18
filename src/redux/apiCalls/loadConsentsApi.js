import apiWrapper from "../apiWrapper";

const loadConsentsApi = huiId => {
  return apiWrapper("get", `/consents/${huiId}`);
};

export default loadConsentsApi;
