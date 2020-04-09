import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";
import getCookie from "./cookies/get_cookie";

const loadConsentsApi = () => {
  const authToken = getCookie("auth-token");

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
