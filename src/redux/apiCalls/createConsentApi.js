import apiWrapper from "../apiWrapper";

const createConsentApi = ({
  patientId,
  selectedPurposeValue,
  selectedStartDate,
  selectedEndDate,
  selectedExpiryDate,
  selectedRequestTypes
}) => {
  const selectedRequests = Object.keys(selectedRequestTypes).reduce(
    (preValue, currValue) =>
      selectedRequestTypes[currValue] ? [...preValue, currValue] : preValue,
    []
  );
  return apiWrapper("post", `/consent-requests/`, {
    patient: {
      id: patientId
    },
    purpose: {
      code: selectedPurposeValue
    },
    hitypes: selectedRequests,
    Permission: {
      dateRange: {
        from: selectedStartDate.toISOString(),
        to: selectedEndDate.toISOString()
      },
      dataExpiryAt: selectedExpiryDate.toISOString()
    }
  });
};

export default createConsentApi;
