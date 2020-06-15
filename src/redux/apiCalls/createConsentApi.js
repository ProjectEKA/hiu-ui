import apiWrapper from '../apiWrapper';
import { defaultHeaders } from '../../constants';

const createConsentApi = ({
  patientId,
  selectedPurposeValue,
  selectedStartDate,
  selectedEndDate,
  selectedExpiryDate,
  selectedRequestTypes,
}) => {
  const selectedRequests = Object.keys(selectedRequestTypes).reduce(
    (preValue, currValue) =>
      selectedRequestTypes[currValue] ? [...preValue, currValue] : preValue,
    []
  );
  const authToken = localStorage.getItem('auth-token');
  return apiWrapper(
    'post',
    '/v1/hiu/consent-requests',
    {
      consent: {
        patient: {
          id: patientId,
        },
        purpose: {
          code: selectedPurposeValue,
        },
        hiTypes: selectedRequests,
        permission: {
          dateRange: {
            from: selectedStartDate.toISOString(),
            to: selectedEndDate.toISOString(),
          },
          dataEraseAt: selectedExpiryDate.toISOString(),
        },
      },
    },
    {
      ...defaultHeaders,
      Authorization: authToken,
    }
  );
};

export default createConsentApi;
