import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";
import getCookie from "./cookies/get_cookie";

const loadHealthDataApi = (consentRequestId, groupFunction) => {
  const authToken = getCookie("auth-token");
  return apiWrapper(
    "get",
    `/health-information/fetch/${consentRequestId}`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default loadHealthDataApi;
