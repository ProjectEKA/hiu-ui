import axios from "axios";
import { contentTypes } from "../constants";

const defaultHeaders = {
  accept: contentTypes.JSON,
  "Content-Type": contentTypes.JSON
};

export default (method, url, data, headers = defaultHeaders) => {
  return axios(url, {
    headers,
    method,
    data
  })
    .then(response => {
      return {
        data: response.data,
        status: response.status
      };
    })
    .catch(error => {
      error: true;
    });
};
