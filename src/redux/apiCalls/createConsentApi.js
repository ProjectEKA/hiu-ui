import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";
import getCookie from "./cookies/get_cookie";

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
  const authToken = getCookie("auth-token");
  return apiWrapper(
    "post",
    `/consent-requests`,
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
          dataExpiryAt: selectedExpiryDate.toISOString(),
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
