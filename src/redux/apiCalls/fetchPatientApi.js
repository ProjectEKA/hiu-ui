import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";
import getCookie from "./cookies/get_cookie";

const fetchPatientApi = patientId => {
  const patientIdWithExtension = patientId.concat("@ncg");
  const authToken = getCookie("auth-token");

  return apiWrapper(
    "get",
    `/patients/${patientIdWithExtension}`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken
    }
  );
};

export default fetchPatientApi;
