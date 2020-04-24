import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const downloadPathologyApi = (consentRequestId) => {
  const attachment = '/attachments/c89fb4ff-f07e-4ecd-8465-5f612e48cccf.dcm';
  return apiWrapper(
    'get',
    `/health-information/fetch/${consentRequestId}/${attachment}`,
    {},
    {
      ...defaultHeaders,
      Authorization: 'RHIuIExha3NobWk=',
    },
  );
};

export default downloadPathologyApi;
