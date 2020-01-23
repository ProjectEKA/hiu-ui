import axios from "axios";
import { contentTypes } from "../constants";

const defaultHeaders = {
  accept: contentTypes.JSON,
  "Content-Type": contentTypes.JSON
};

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
