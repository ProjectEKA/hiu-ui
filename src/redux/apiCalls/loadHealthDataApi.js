import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const loadHealthDataApi = consentRequestId => {
  return apiWrapper(
    "get",
    `/health-information/fetch/${consentRequestId}`,
    {},
    {
      ...defaultHeaders,
      Authorization: "RHIuIExha3NobWk="
    }
  );
};

export default loadHealthDataApi;
