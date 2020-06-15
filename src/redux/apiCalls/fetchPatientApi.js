import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const fetchPatientApi = (patientId) => {
  const authToken = localStorage.getItem('auth-token');

  return apiWrapper(
    'get',
    `/v1/patients/${patientId}`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default fetchPatientApi;
