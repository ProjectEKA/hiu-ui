import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const loadConsentsApi = () => {
  const authToken = localStorage.getItem('auth-token');

  return apiWrapper(
    'get',
    '/v1/hiu/consent-requests',
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    },
  );
};

export default loadConsentsApi;
