import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const loadHealthDataApi = (consentRequestId, groupFunction) => {
  const authToken = localStorage.getItem('auth-token');
  return apiWrapper(
    'get',
    `/health-information/fetch/${consentRequestId}`,
    {},
    {
      ...defaultHeaders,
      Authorization: authToken,
    },
  );
};

export default loadHealthDataApi;
