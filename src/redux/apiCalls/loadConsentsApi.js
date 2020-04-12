import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const loadConsentsApi = () => {
  const authToken = localStorage.getItem("auth-token");

  return apiWrapper(
    "get",
    `/consent-requests/`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default loadConsentsApi;
