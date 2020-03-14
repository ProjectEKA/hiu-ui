import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const fetchPatientApi = patientId => {
  const patientIdWithExtension = patientId.concat("@ncg");
  return apiWrapper(
    "get",
    `/patients/${patientIdWithExtension}`,
    {},
    {
      ...defaultHeaders,
      Authorization: "RHIuIExha3NobWk="
    }
  );
};

export default fetchPatientApi;
