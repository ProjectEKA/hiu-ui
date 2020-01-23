import apiWrapper from "../apiWrapper";

const fetchPatientApi = patientId => {
  const patientIdWithExtension = patientId.concat("@NCG");
  return apiWrapper("get", `/patients/${patientIdWithExtension}`);
};

export default fetchPatientApi;
