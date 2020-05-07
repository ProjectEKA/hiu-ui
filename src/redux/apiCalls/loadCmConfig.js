import apiWrapper from "../apiWrapper";
import { defaultHeaders } from "../../constants";

const loadCmConfigApi = () => {
  return apiWrapper(
    "get",
    `/config`,
    {},
    {
      ...defaultHeaders,
    }
  );
};

export default loadCmConfigApi;
