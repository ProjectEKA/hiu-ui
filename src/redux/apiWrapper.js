import axios from "axios";
import { defaultHeaders } from "../constants";

export default (method, url, data, headers = defaultHeaders, baseURL) => {
  return axios({
    headers,
    method,
    data,
    url,
    baseURL
  });
};
