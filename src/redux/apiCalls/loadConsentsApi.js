import apiWrapper from "../apiWrapper";

const loadConsentsApi = hiuId => {
  return apiWrapper("get", `/consents/${hiuId}`);
};

export default loadConsentsApi;
