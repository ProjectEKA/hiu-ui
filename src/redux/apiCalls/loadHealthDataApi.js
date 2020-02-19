import apiWrapper from "../apiWrapper";

const loadHealthDataApi = () => {
  console.log("fetchPatientDataApi");
  const consentRequestId = "123";
  return apiWrapper("get", `/health-information/fetch/${consentRequestId}`);
};

export default loadHealthDataApi;
