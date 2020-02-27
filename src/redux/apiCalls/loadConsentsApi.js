import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const loadConsentsApi = () => {
  return apiWrapper(
    "get",
    `/api/consent-requests/`,
    {},
    {
      ...defaultHeaders,
      Authorization: "RHIuIExha3NobWk="
    }
  );
};

export default loadConsentsApi;
