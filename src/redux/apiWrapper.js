import axios from "axios";
const ContentTypes = {
  JSON: "application/json;charset=UTF-8"
};
const defaultHeader = () => ({
  accept: ContentTypes.JSON,
  "Content-Type": ContentTypes.JSON
});

export default (method, url, data, headers = defaultHeader()) => {
  debugger;
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
