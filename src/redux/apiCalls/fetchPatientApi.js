import apiWrapper from "../apiWrapper";

const fetchPatientApi = patientId => {
  const patientIdWithExtension = patientId.concat("@ncg");
  return apiWrapper("get", `/patients/${patientIdWithExtension}`);
};

export default fetchPatientApi;
