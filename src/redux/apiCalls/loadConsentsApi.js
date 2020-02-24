import apiWrapper from "../apiWrapper";

const loadConsentsApi = () => {
  return apiWrapper("get", `/api/consent-requests/`);
};

export default loadConsentsApi;
