import axios from "axios";
import { defaultHeaders } from "../constants";

export default (
  method,
  url,
  data,
  headers = defaultHeaders,
  baseURL = BACKEND_BASE_URL
) => {
  return axios({
    headers,
    method,
    data,
    url,
    baseURL
  });
};
