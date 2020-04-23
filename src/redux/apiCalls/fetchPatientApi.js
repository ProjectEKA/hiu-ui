import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const fetchPatientApi = (patientId) => {
  const patientIdWithExtension = patientId.concat('@ncg');
  const authToken = localStorage.getItem('auth-token');

  return apiWrapper(
    'get',
    `/patients/${patientIdWithExtension}`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    },
  );
};

export default fetchPatientApi;
